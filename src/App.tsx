import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Stats from './pages/stats';


export default function App() {
  return (
    <BrowserRouter>
      {/* Dark theme wrapper */}
      <div className="min-h-screen bg-[#121212] text-neutral-300 font-sans">

        {/* Navigation Bar */}
        <nav className="bg-[#1a1a1a] border-b border-neutral-800 p-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex gap-6">
            <Link to="/" className="text-orange-200/80 hover:text-orange-200 font-medium transition-colors">
              Inventory
            </Link>
            <Link to="/stats" className="text-orange-200/80 hover:text-orange-200 font-medium transition-colors">
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