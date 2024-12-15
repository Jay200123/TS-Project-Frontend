import { create } from "zustand";
import { EquipmentState } from "../interface";
import api from "./api";
import { multipart } from "./multipart";
import { PATH } from "../constants";

export const useEquipmentStore = create<EquipmentState>((set) => ({
  equipments: [],
  equipment: null,
  loading: false,
  error: null,
  getAllEquipments: async () => {
    const res = await api(
      `${import.meta.env.VITE_API_URI}${PATH.EQUIPMENTS_ROUTE}`
    );
    set({ equipments: res?.data?.details, loading: false, error: null });

    return res?.data?.details;
  },
  getOneEquipment: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.EQUIPMENT_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({
      equipment: !Array.isArray(res.data.details) ? res.data.details : null,
      loading: false,
      error: null,
    });

    return res.data.details;
  },
  createEquipment: async (data: FormData) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.EQUIPMENTS_ROUTE}`,
      data,
      {
        headers: multipart,
      }
    );

    set({ equipment: res.data.details, loading: false, error: null });

    return res.data.details;
  },
  updateEquipmentById: async (id: string, data: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_EQUIPMENT_ROUTE.replace(
        ":id",
        id
      )}`,
      data,
      {
        headers: multipart,
      }
    );
    set({ equipment: res.data.details, loading: false, error: null });
  },
  deleteEquipmentById: async (id: string) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.EQUIPMENT_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({ equipment: res.data.details, loading: false, error: null });
  },
}));
