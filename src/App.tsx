import { useState } from 'react';
import Calculator from './components/Calculator';
import History from './components/History';
import BornLogo from './components/BornLogo';
import { useHistory } from './hooks/useHistory';
import type { Tab } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const { history, addEntry, removeEntry, clearHistory } = useHistory();

  return (
    <div className="app">
      <header className="app-header">
        <BornLogo className="brand-logo" />
      </header>

      <main className="app-content">
        {activeTab === 'calculator' ? (
          <Calculator onSave={addEntry} />
        ) : (
          <History
            history={history}
            onRemove={removeEntry}
            onClear={clearHistory}
          />
        )}
      </main>

      <nav className="tab-bar">
        <button
          className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="10" y2="10" />
            <line x1="12" y1="10" x2="14" y2="10" />
            <line x1="8" y1="14" x2="10" y2="14" />
            <line x1="12" y1="14" x2="14" y2="14" />
            <line x1="8" y1="18" x2="10" y2="18" />
            <line x1="12" y1="18" x2="16" y2="18" />
          </svg>
          <span>Calculator</span>
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>History</span>
          {history.length > 0 && (
            <span className="tab-badge">{history.length}</span>
          )}
        </button>
      </nav>
    </div>
  );
}

export default App;
