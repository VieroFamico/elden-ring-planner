import { create } from 'zustand';
import type { Weapon } from './types';

interface LoadoutState {
    equippedWeapons: Weapon[];  
    equipWeapon: (weapon: Weapon) => void;  
    unequipWeapon: (id: string) => void;     
}

export const useLoadoutStore = create<LoadoutState>((set) => ({
    equippedWeapons: [],

    equipWeapon: (weapon) =>
        set((state) => {
            if (state.equippedWeapons.length >= 6) return state;
            return { equippedWeapons: [...state.equippedWeapons, weapon] };
        }),

    unequipWeapon: (id) =>
        set((state) => ({
            equippedWeapons: state.equippedWeapons.filter(w => w.id !== id)
        })),
}));