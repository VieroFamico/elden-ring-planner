export interface Equipment {
    id: string;
    name: string;
    image: string;
    weight: number;
}

export interface EquippedItem extends Equipment {
    instanceId: string;
}