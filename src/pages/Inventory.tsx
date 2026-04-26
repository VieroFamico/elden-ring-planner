import { useEffect, useState } from 'react';
import type { Equipment } from '../types';
import { useLoadoutStore } from '../store';

export default function Inventory() {
    const [weapons, setWeapons] = useState<Equipment[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // 1. Add the Async States
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const equippedWeapons = useLoadoutStore((state) => state.equippedWeapons);
    const equipWeapon = useLoadoutStore((state) => state.equipWeapon);
    const unequipWeapon = useLoadoutStore((state) => state.unequipWeapon);

    useEffect(() => {
        fetch('https://eldenring.fanapis.com/api/weapons?limit=20')
            .then(response => {
                // Intercept bad server responses (like 404 or 500 errors)
                if (!response.ok) throw new Error('Failed to fetch data from the server.');
                return response.json();
            })
            .then(json => setWeapons(json.data))
            // Error Catch
            .catch (err => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);
    
    const totalWeight = equippedWeapons.reduce((sum, weapon) => sum + weapon.weight, 0);

    const filteredWeapons = weapons.filter(weapon =>
        weapon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const FilteredWeaponsPart = 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtered Weapon */}
        {filteredWeapons.map(weapon => (
            <div key={weapon.id} className="bg-[#1e1e1e] p-4 rounded-lg border border-neutral-800 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-neutral-200">{weapon.name}</h3>
                    <p className="text-neutral-500 text-sm mt-1">Weight: {weapon.weight}</p>
                </div>
                {/* Minimalist translucent button */}
                <button
                    onClick={() => equipWeapon(weapon)}
                    disabled={equippedWeapons.length >= 6}
                    className="mt-4 bg-orange-900/20 hover:bg-orange-900/40 text-orange-200/90 border border-orange-900/50 disabled:bg-[#1a1a1a] disabled:text-neutral-600 disabled:border-neutral-800 font-medium py-2 px-4 rounded transition-colors"
                >
                    {equippedWeapons.length >= 6 ? 'Limit Reached' : 'Equip'}
                </button>
            </div>
        ))}
        
        {/* If no result, show a message */}
        {filteredWeapons.length === 0 && (
            <p className="text-neutral-600 italic col-span-2">No weapons found matching "{searchQuery}".</p>
        )}
    </div>;
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Weapon Grid */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-2">
                    <h2 className="text-2xl font-bold text-orange-200/80">
                        Available Weapons
                    </h2>
                    {/* The Search Input */}
                    <input
                        type="text"
                        placeholder="Search weapons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#1a1a1a] text-neutral-300 border border-neutral-800 rounded px-3 py-1 text-sm focus:outline-none focus:border-orange-900/50 transition-colors"
                    />
                </div>

                {/* The Conditional UI Routing */}
                {isLoading ? (
                    /* Loading UI */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 h-[140px] flex flex-col justify-between animate-pulse">
                                <div>
                                    <div className="h-5 bg-neutral-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-neutral-700 rounded w-1/4"></div>
                                </div>
                                <div className="h-10 bg-neutral-700 rounded w-full mt-4"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    /* Error */
                    <div className="bg-red-950/30 text-rose-300 p-4 rounded-lg border border-red-900/50 font-medium">
                        Error: {error}
                    </div>
                ) : FilteredWeaponsPart
                }
            </div>

            {/* Loadout Sidebar */}
            <div className="bg-[#1e1e1e] p-6 rounded-lg border border-neutral-800 h-fit">
                <h2 className="text-2xl font-bold text-orange-200/80 mb-4 border-b border-neutral-800 pb-2">
                    My Loadout
                </h2>
                <h3 className="text-lg mb-4 text-neutral-400">Total Weight: <span className="text-neutral-200 font-mono">{totalWeight.toFixed(1)}</span></h3>
                <ul className="space-y-3">
                    {equippedWeapons.map(weapon => (
                        <li key={weapon.instanceId} className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded border border-neutral-800">
                            <span className="font-medium text-neutral-300">{weapon.name}</span>
                            <button
                                onClick={() => unequipWeapon(weapon.instanceId)}
                                className="text-rose-900 hover:text-rose-700 text-sm font-bold uppercase transition-colors"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    {equippedWeapons.length === 0 && (
                        <p className="text-neutral-600 italic text-sm">No weapons equipped.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}