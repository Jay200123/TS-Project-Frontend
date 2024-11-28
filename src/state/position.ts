import { create } from "zustand";
import { PositionState } from "../interface";
import api from "./api";
import { PATH } from "../constants";


export const usePositionStore = create<PositionState>((set) => ({
  positions: [],
  position: null,
  loading: false,
  error: null,
  getAllPositions: async () => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.POSITIONS_ROUTES}`
    );
    set({ positions: res.data.details, loading: false, error: null });

    return res.data.details;
  },

  getOnePosition: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.DEPARTMENT_ID_ROUTE.replace(":id", id)}`
    );

    set({
      position: !Array.isArray(res.data.details) ? res.data.details : null,
      loading: false,
      error: null,
    });

    return res.data.details;
  },

  createPosition: async (formData: FormData) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.POSITIONS_ROUTES}`,
      formData);
    set({ position: res.data.details, loading: false, error: null });
    return res.data.details;
  },
  updatePositionById: async (id: string, formData: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_POSITION_ROUTE.replace(":id", id)}`,
      formData);

    set({ position: res.data.details, loading: false, error: null });

    return res.data.details;
  },
  deletePositionById: async (id: string) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.DEPARTMENT_ID_ROUTE.replace(":id", id)}`,
    );
    set({ position: res.data.details, loading: false, error: null });
    return res.data.details;
  },
}));
