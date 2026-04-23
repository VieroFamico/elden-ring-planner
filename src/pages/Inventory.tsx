import { useEffect, useState } from 'react';
import type { Weapon } from '../types';
import { useLoadoutStore } from '../store';

export default function Inventory() {
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const equippedWeapons = useLoadoutStore((state) => state.equippedWeapons);
    const equipWeapon = useLoadoutStore((state) => state.equipWeapon);
    const unequipWeapon = useLoadoutStore((state) => state.unequipWeapon);

    useEffect(() => {
        fetch('https://eldenring.fanapis.com/api/weapons?limit=6')
            .then(response => response.json())
            .then(json => setWeapons(json.data));
    }, []);

    const totalWeight = equippedWeapons.reduce((sum, weapon) => sum + weapon.weight, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weapon Grid */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-yellow-500 mb-6 border-b border-neutral-700 pb-2">
                    Available Weapons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weapons.map(weapon => (
                        <div key={weapon.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg">{weapon.name}</h3>
                                <p className="text-neutral-400 text-sm mt-1">Weight: {weapon.weight}</p>
                            </div>
                            <button
                                onClick={() => equipWeapon(weapon)}
                                disabled={equippedWeapons.length >= 6}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-neutral-900 font-bold py-2 px-4 rounded transition-colors"
                            >
                                {equippedWeapons.length >= 6 ? 'Limit Reached' : 'Equip'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Loadout Sidebar */}
            <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 h-fit">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4 border-b border-neutral-700 pb-2">
                    My Loadout
                </h2>
                <h3 className="text-lg mb-4">Total Weight: <span className="text-white font-mono">{totalWeight.toFixed(1)}</span></h3>
                <ul className="space-y-3">
                    {equippedWeapons.map(weapon => (
                        <li key={weapon.instanceId} className="flex justify-between items-center bg-neutral-900 p-3 rounded border border-neutral-700">
                            <span className="font-medium">{weapon.name}</span>
                            <button
                                onClick={() => unequipWeapon(weapon.instanceId)}
                                className="text-red-400 hover:text-red-300 text-sm font-bold uppercase"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    {equippedWeapons.length === 0 && (
                        <p className="text-neutral-500 italic text-sm">No weapons equipped.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}