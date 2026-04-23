import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Stats from './pages/stats';


export default function App() {
  return (
    <BrowserRouter>
      {/* Dark theme wrapper */}
      <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">

        {/* Navigation Bar */}
        <nav className="bg-neutral-800 border-b border-neutral-700 p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex gap-6">
            <Link to="/" className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">
              Inventory
            </Link>
            <Link to="/stats" className="text-neutral-300 hover:text-white transition-colors">
              Character Stats
            </Link>
          </div>
        </nav>

        {/* Content Container */}
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}