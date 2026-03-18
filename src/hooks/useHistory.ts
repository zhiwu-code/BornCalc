import { useState, useEffect } from 'react';
import type { CalculationResult } from '../types';

const STORAGE_KEY = 'borncalc-history';

function loadHistory(): CalculationResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: CalculationResult[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useHistory() {
  const [history, setHistory] = useState<CalculationResult[]>(loadHistory);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  function addEntry(entry: CalculationResult) {
    setHistory((prev) => [entry, ...prev]);
  }

  function removeEntry(id: string) {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, addEntry, removeEntry, clearHistory };
}
