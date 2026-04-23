export interface Weapon {
    id: string;
    name: string;
    image: string;
    weight: number;
}

export interface EquippedWeapon extends Weapon {
    instanceId: string;
}