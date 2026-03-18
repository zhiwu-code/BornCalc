import type { CalculationResult } from '../types';
import { formatCurrency, formatPercent } from '../utils/retailMath';
import './History.css';

interface Props {
  history: CalculationResult[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function History({ history, onRemove, onClear }: Props) {
  if (history.length === 0) {
    return (
      <div className="history">
        <div className="history-empty">
          <div className="empty-icon">📋</div>
          <p>No saved calculations yet</p>
          <p className="empty-hint">
            Calculate a retail price and tap "Save to History" to keep a record
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="history">
      <div className="history-header">
        <span className="history-count">{history.length} saved</span>
        <button className="btn-clear-all" onClick={onClear}>
          Clear All
        </button>
      </div>
      <div className="history-list">
        {history.map((entry) => (
          <div key={entry.id} className="history-card">
            <div className="history-card-header">
              <span className="history-time">{formatTime(entry.timestamp)}</span>
              <button
                className="btn-remove"
                onClick={() => onRemove(entry.id)}
                aria-label="Remove"
              >
                ×
              </button>
            </div>
            <div className="history-card-body">
              <div className="history-prices">
                <div className="history-price-item">
                  <span className="hp-label">Cost</span>
                  <span className="hp-value">{formatCurrency(entry.cost)}</span>
                </div>
                <div className="history-arrow">→</div>
                <div className="history-price-item">
                  <span className="hp-label">Retail</span>
                  <span className="hp-value highlight">{formatCurrency(entry.retailPrice)}</span>
                </div>
              </div>
              <div className="history-details">
                <span>Margin {formatPercent(entry.marginPercent)}</span>
                <span className="detail-sep">·</span>
                <span>Markup {formatPercent(entry.markupPercent)}</span>
                <span className="detail-sep">·</span>
                <span>Profit {formatCurrency(entry.profit)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
