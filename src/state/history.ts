import api from "./api";
import { create } from "zustand";
import { HistoryState } from "../interface/history";
import { PATH } from "../constants";

export const useHistoryStore = create<HistoryState>((set) => ({
    histories: [],
    history: null,
    error: "",
    loading: false,
    getAllHistories: async () => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.HISTORIES_ROUTE}`);
        set({ histories: res.data.details, loading: false, error: "" });

        return res?.data?.details;
    },
    getOneHistory: async (id: string) => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.HISTORY_ID_ROUTE.replace(":id", id)}`);
        set({ history: !Array.isArray(res.data.details) ? res.data.details : null, loading: false, error: "" });

        return res?.data?.details;
    },
    deleteHistoryById: async (id: string) => {
        const res = await api.delete(`${import.meta.env.VITE_API_URI}${PATH.HISTORY_ID_ROUTE.replace(":id", id)}`);
        set({ history: res.data.details, loading: false, error: "" });
    }
}));
