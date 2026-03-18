export interface CalculationResult {
  id: string;
  timestamp: number;
  cost: number;
  marginPercent: number;
  markupPercent: number;
  retailPrice: number;
  profit: number;
  label?: string;
}

export type Tab = 'calculator' | 'history';
