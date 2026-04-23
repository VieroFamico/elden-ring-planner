import { useLoadoutStore } from '../store';
import { Link } from 'react-router-dom';

export default function Stats() {
    const equippedWeapons = useLoadoutStore((state) => state.equippedWeapons);
    const totalWeight = equippedWeapons.reduce((sum, weapon) => sum + weapon.weight, 0);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Character Stats</h1>
            <Link to="/">← Back to Inventory</Link>

            <h2>Total Equip Load: {totalWeight.toFixed(1)}</h2>
            <ul>
                {equippedWeapons.map(weapon => (
                    <li key={weapon.id}>{weapon.name}</li>
                ))}
            </ul>
        </div>
    );
}