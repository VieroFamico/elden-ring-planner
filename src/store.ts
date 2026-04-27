import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Equipment, EquippedItem } from './types';

interface LoadoutState {
    equippedWeapons: EquippedItem[];
    equippedArmor: EquippedItem[]
    equipWeapon: (item: Equipment) => void;
    unequipWeapon: (instanceId: string) => void;
    equipArmor: (item: Equipment) => void;
    unequipArmor: (instanceId: string) => void;
}

export const useLoadoutStore = create<LoadoutState>()(
    persist(
        (set) => ({
            equippedWeapons: [],
            equippedArmor: [],

            // --- WEAPON LOGIC ---
            equipWeapon: (item) =>
                set((state) => {
                    if (state.equippedWeapons.length >= 6) return state;
                    const newItem: EquippedItem = { ...item, instanceId: crypto.randomUUID() };
                    return { equippedWeapons: [...state.equippedWeapons, newItem] };
                }),

            unequipWeapon: (instanceId) =>
                set((state) => ({
                    equippedWeapons: state.equippedWeapons.filter(w => w.instanceId !== instanceId)
                })),

            // --- ARMOR LOGIC ---
            equipArmor: (item) =>
                set((state) => {
                    if (state.equippedArmor.length >= 4) return state; // Limit of 4 armor pieces
                    const newItem: EquippedItem = { ...item, instanceId: crypto.randomUUID() };
                    return { equippedArmor: [...state.equippedArmor, newItem] };
                }),

            unequipArmor: (instanceId) =>
                set((state) => ({
                    equippedArmor: state.equippedArmor.filter(a => a.instanceId !== instanceId)
                })),
        }),
        {
            name: 'elden-ring-loadout-storage',
        }
    )
);