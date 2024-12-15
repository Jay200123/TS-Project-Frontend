import { Image } from "./image";

interface Equipment {
    _id:string;
    equipment_name:string;  
    price:number;
    quantity:number;
    borrowedQuantity: number;
    damagedQuantity: number;    
    lostQuantity: number;
    image: Image[];
}

interface EquipmentState {
    equipments: Equipment[],
    equipment: Equipment | null,
    loading: boolean,
    error: string | null,
    getAllEquipments: ()=> Promise<Equipment[]>,
    getOneEquipment: (id: string) => Promise<Equipment | null>, 
    createEquipment: (data: FormData) => Promise<void>,
    updateEquipmentById: (id: string, data: FormData) => Promise<void>,
    deleteEquipmentById: (id: string) => Promise<void>, 
}

export type {
    Equipment,
    EquipmentState
}