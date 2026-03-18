import { useState, useMemo } from 'react';
import {
  retailFromMargin,
  retailFromMarkup,
  costFromMargin,
  marginToMarkup,
  markupToMargin,
  marginFromPrices,
  markupFromPrices,
  profit,
  formatCurrency,
  formatPercent,
} from '../utils/retailMath';
import type { CalculationResult } from '../types';
import './Calculator.css';

interface Props {
  onSave: (entry: CalculationResult) => void;
}

type CalcMode = 'margin' | 'markup';
type Direction = 'forward' | 'reverse';

const PRESETS_MARGIN = [25, 30, 35, 40, 45];
const PRESETS_MARKUP = [25, 50, 100, 150, 200];

function roundRetail(price: number, rounding: string): number {
  if (rounding === 'none') return price;
  const suffix = rounding === '.99' ? 0.99 : 0.95;
  return Math.floor(price) + suffix;
}

export default function Calculator({ onSave }: Props) {
  const [cost, setCost] = useState('');
  const [percent, setPercent] = useState(30);
  const [mode, setMode] = useState<CalcMode>('margin');
  const [saved, setSaved] = useState(false);
  const [rounding, setRounding] = useState('none');
  const [direction, setDirection] = useState<Direction>('forward');
  const [retail, setRetail] = useState('');
  const [reverseMargin, setReverseMargin] = useState(50);

  const sliderMax = mode === 'margin' ? 99 : 200;
  const presets = mode === 'margin' ? PRESETS_MARGIN : PRESETS_MARKUP;

  // Forward: cost + slider → retail
  const forwardResult = useMemo<CalculationResult | null>(() => {
    if (direction !== 'forward') return null;
    const costNum = parseFloat(cost);
    if (isNaN(costNum) || costNum <= 0) return null;

    let rawRetail: number;
    let marginPct: number;
    let markupPct: number;

    if (mode === 'margin') {
      rawRetail = retailFromMargin(costNum, percent);
      marginPct = percent;
      markupPct = marginToMarkup(percent);
    } else {
      rawRetail = retailFromMarkup(costNum, percent);
      markupPct = percent;
      marginPct = markupToMargin(percent);
    }

    const finalRetail = roundRetail(rawRetail, rounding);
    const actualMargin = rounding !== 'none' ? marginFromPrices(costNum, finalRetail) : marginPct;
    const actualMarkup = rounding !== 'none' ? markupFromPrices(costNum, finalRetail) : markupPct;

    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      cost: costNum,
      marginPercent: actualMargin,
      markupPercent: actualMarkup,
      retailPrice: finalRetail,
      profit: profit(costNum, finalRetail),
    };
  }, [cost, percent, mode, rounding, direction]);

  // Reverse: retail + margin slider → landed cost
  const reverseResult = useMemo<CalculationResult | null>(() => {
    if (direction !== 'reverse') return null;
    const retailNum = parseFloat(retail);
    if (isNaN(retailNum) || retailNum <= 0) return null;

    const landedCost = costFromMargin(retailNum, reverseMargin);
    const markupPct = markupFromPrices(landedCost, retailNum);

    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      cost: landedCost,
      marginPercent: reverseMargin,
      markupPercent: markupPct,
      retailPrice: retailNum,
      profit: profit(landedCost, retailNum),
    };
  }, [retail, reverseMargin, direction]);

  const result = direction === 'forward' ? forwardResult : reverseResult;

  function handleSave() {
    if (result) {
      onSave({ ...result, id: crypto.randomUUID(), timestamp: Date.now() });
      setSaved(true);
    }
  }

  function handleClear() {
    setCost('');
    setPercent(30);
    setRetail('');
    setReverseMargin(50);
    setSaved(false);
  }

  return (
    <div className="calculator">
      <div className="calc-section">
        {/* Direction toggle: Forward vs Reverse */}
        <div className="mode-toggle">
          <button
            className={`mode-btn ${direction === 'forward' ? 'active' : ''}`}
            onClick={() => { setDirection('forward'); setSaved(false); }}
          >
            Cost → Retail
          </button>
          <button
            className={`mode-btn ${direction === 'reverse' ? 'active' : ''}`}
            onClick={() => { setDirection('reverse'); setSaved(false); }}
          >
            Retail → Cost
          </button>
        </div>

        {direction === 'forward' ? (
          <>
            {/* Cost input */}
            <div className="input-group">
              <label htmlFor="cost">Wholesale Cost</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  id="cost"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={cost}
                  onChange={(e) => { setCost(e.target.value); setSaved(false); }}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Margin / Markup mode toggle */}
            <div className="mode-toggle sub-toggle">
              <button
                className={`mode-btn ${mode === 'margin' ? 'active' : ''}`}
                onClick={() => { setMode('margin'); setPercent(Math.min(percent, 99)); setSaved(false); }}
              >
                Margin %
              </button>
              <button
                className={`mode-btn ${mode === 'markup' ? 'active' : ''}`}
                onClick={() => { setMode('markup'); setSaved(false); }}
              >
                Markup %
              </button>
            </div>

            {/* Preset buttons */}
            <div className="presets">
              {presets.map((p) => (
                <button
                  key={p}
                  className={`preset-btn ${percent === p ? 'active' : ''}`}
                  onClick={() => { setPercent(p); setSaved(false); }}
                >
                  {p}%
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="input-group">
              <div className="slider-container">
                <input
                  id="percent"
                  type="range"
                  className="slider"
                  min="0"
                  max={sliderMax}
                  step="1"
                  value={percent}
                  onChange={(e) => { setPercent(Number(e.target.value)); setSaved(false); }}
                  style={{ '--slider-pct': `${(percent / sliderMax) * 100}%` } as React.CSSProperties}
                />
                <span className="slider-value">{percent}%</span>
              </div>
            </div>

            {/* Rounding toggle */}
            <div className="rounding-row">
              <span className="rounding-label">Round retail</span>
              <div className="rounding-options">
                {(['none', '.99', '.95'] as const).map((opt) => (
                  <button
                    key={opt}
                    className={`rounding-btn ${rounding === opt ? 'active' : ''}`}
                    onClick={() => { setRounding(opt); setSaved(false); }}
                  >
                    {opt === 'none' ? 'Off' : opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Reverse mode: retail input + margin slider */}
            <div className="input-group">
              <label htmlFor="retail">Retail Price</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  id="retail"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={retail}
                  onChange={(e) => { setRetail(e.target.value); setSaved(false); }}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Margin % slider for reverse mode */}
            <div className="input-group">
              <label htmlFor="reverse-margin">Margin %</label>
              <div className="slider-container">
                <input
                  id="reverse-margin"
                  type="range"
                  className="slider"
                  min="0"
                  max="80"
                  step="1"
                  value={reverseMargin}
                  onChange={(e) => { setReverseMargin(Number(e.target.value)); setSaved(false); }}
                  style={{ '--slider-pct': `${(reverseMargin / 80) * 100}%` } as React.CSSProperties}
                />
                <span className="slider-value">{reverseMargin}%</span>
              </div>
            </div>
          </>
        )}

        <button className="btn-clear" onClick={handleClear}>
          Clear
        </button>
      </div>

      {result && (
        <div className="results-card">
          <div className="result-row highlight">
            <span className="result-label">
              {direction === 'forward' ? 'Retail Price' : 'Landed Cost'}
            </span>
            <span className="result-value">
              {direction === 'forward'
                ? formatCurrency(result.retailPrice)
                : formatCurrency(result.cost)}
            </span>
          </div>
          {direction === 'forward' && (
            <>
              <div className="result-row">
                <span className="result-label">Profit</span>
                <span className="result-value">{formatCurrency(result.profit)}</span>
              </div>
              <div className="result-divider" />
              <div className="result-row">
                <span className="result-label">Margin</span>
                <span className="result-value">{formatPercent(result.marginPercent)}</span>
              </div>
              <div className="result-row">
                <span className="result-label">Markup</span>
                <span className="result-value">{formatPercent(result.markupPercent)}</span>
              </div>
            </>
          )}

          <button
            className={`btn-save ${saved ? 'saved' : ''}`}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? 'Saved to History' : 'Save to History'}
          </button>
        </div>
      )}
    </div>
  );
}
