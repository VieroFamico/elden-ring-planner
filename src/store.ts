import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Weapon, EquippedWeapon } from './types';

interface LoadoutState {
    equippedWeapons: EquippedWeapon[];
    equipWeapon: (weapon: Weapon) => void;  
    unequipWeapon: (instanceId: string) => void;     
}

export const useLoadoutStore = create<LoadoutState>()(
    persist(
        (set) => ({
            equippedWeapons: [],

            equipWeapon: (weapon) =>
                set((state) => {
                    if (state.equippedWeapons.length >= 6) return state;

                    const newEquippedWeapon: EquippedWeapon = {
                        ...weapon,
                        instanceId: crypto.randomUUID()
                    };

                    return { equippedWeapons: [...state.equippedWeapons, newEquippedWeapon] };
                }),

            unequipWeapon: (instanceId) =>
                set((state) => ({
                    equippedWeapons: state.equippedWeapons.filter(w => w.instanceId !== instanceId)
                })),
        }),
        {
            name: 'elden-ring-loadout-storage',
        }
    )
);