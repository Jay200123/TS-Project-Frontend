import { create } from "zustand";
import { PositionState } from "../interface";
import api from "./api";


export const usePositionStore = create<PositionState>((set) => ({
  positions: [],
  position: null,
  loading: false,
  error: null,
  getAllPositions: async () => {
    const res = await api.get(
      `${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/positions`
    );
    set({ positions: res.data.details, loading: false, error: null });

    return res.data.details;
  },

  getOnePosition: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/position/${id}`
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
      `${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/positions`,
      formData);
    set((state) => ({
      positions: [...state.positions, res.data.details],
      loading: false,
      error: null,
    }));

    return res.data.details;
  },
  updatePositionById: async (id: string, formData: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_URI}${
        import.meta.env.VITE_API
      }/position/edit/${id}`,
      formData);

    set((state) => ({
      positions: state.positions.map((p) =>
        p._id === id ? res.data.details : p
      ),
    }));

    return res.data.details;
  },
  deletePositionById: async (id: string) => {
    const res = await api.delete(
      `${import.meta.env.VITE_URI}${
        import.meta.env.VITE_API
      }/position/${id}`
    );
    set((state) => ({
      positions: state.positions.filter((p) => p._id !== id),
    }));

    return res.data.details;
  },
}));
