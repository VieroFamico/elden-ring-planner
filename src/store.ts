import { create } from 'zustand';
import type { Weapon, EquippedWeapon } from './types';

interface LoadoutState {
    equippedWeapons: EquippedWeapon[];
    equipWeapon: (weapon: Weapon) => void;  
    unequipWeapon: (instanceId: string) => void;     
}

export const useLoadoutStore = create<LoadoutState>((set) => ({
    equippedWeapons: [],

    equipWeapon: (weapon) =>
        set((state) => {
            if (state.equippedWeapons.length >= 6) return state;

            // Create a unique copy of the weapon using the browser's crypto API
            const newEquippedWeapon: EquippedWeapon = {
                ...weapon,
                instanceId: crypto.randomUUID()
            };

            return { equippedWeapons: [...state.equippedWeapons, newEquippedWeapon] };
        }),

    unequipWeapon: (instanceId) =>
        set((state) => ({
            // Filter by the unique instanceId, not the API id
            equippedWeapons: state.equippedWeapons.filter(w => w.instanceId !== instanceId)
        })),
}));