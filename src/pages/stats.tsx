import { useLoadoutStore } from '../store';
import { Link } from 'react-router-dom';

export default function Stats() {
    const equippedWeapons = useLoadoutStore((state) => state.equippedWeapons);
    const totalWeight = equippedWeapons.reduce((sum, weapon) => sum + weapon.weight, 0);

    return (
        <div className="bg-[#1e1e1e] p-8 rounded-lg border border-neutral-800 shadow-lg max-w-2xl mx-auto mt-4">

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
                <h1 className="text-3xl font-bold text-orange-200/80">Character Stats</h1>
                <Link
                    to="/"
                    className="text-neutral-500 hover:text-orange-200/80 transition-colors text-sm uppercase tracking-wider font-medium"
                >
                    ← Back
                </Link>
            </div>

            {/* Primary Stat Display */}
            <div className="mb-8 bg-[#1a1a1a] p-6 rounded border border-neutral-800/50 text-center">
                <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-2">Total Equip Load</h2>
                <div className="text-5xl font-mono text-neutral-200">
                    {totalWeight.toFixed(1)}
                </div>
            </div>

            {/* Arsenal List */}
            <div>
                <h3 className="text-sm uppercase tracking-widest text-orange-200/60 mb-4 border-b border-neutral-800/50 pb-2">
                    Equipped Arsenal ({equippedWeapons.length}/6)
                </h3>

                {equippedWeapons.length === 0 ? (
                    <p className="text-neutral-600 italic text-center py-4">No weapons currently equipped.</p>
                ) : (
                    <ul className="space-y-3">
                        {equippedWeapons.map(weapon => (
                            <li key={weapon.instanceId} className="flex justify-between items-center bg-[#121212] p-4 rounded border border-neutral-800/50">
                                <span className="font-medium text-neutral-300">{weapon.name}</span>
                                <span className="text-neutral-600 font-mono text-sm border-l border-neutral-800 pl-4">
                                    Wgt: {weapon.weight}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}