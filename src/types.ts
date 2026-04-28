export interface Equipment {
    id: string;
    name: string;
    image: string;
    weight: number;
}

export interface EquippedItem extends Equipment {
    instanceId: string;
}

export const SortOrder = {
  LightToHeavy: 'LtoH',
  HeavyToLight: 'HtoL'
} as const;

export type SortOrderType = typeof SortOrder[keyof typeof SortOrder];