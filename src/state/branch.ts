import { create } from "zustand";
import api from "./api";
import { BranchState } from "../interface";
import { multipart } from "./multipart";
import { PATH } from "../constants";

export const useBranchStore = create<BranchState>((set) => ({
    branches: [],
    branch: null,
    loading: false,
    error: null,
    getAllBranches: async () => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.BRANCHES_ROUTE}`);
        set({ branches: res.data.details, loading: false, error: null });

        return res.data.details;
    },

    getOneBranch: async (id) => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.BRANCH_ID_ROUTE.replace(":id", id)}`);
        set({
            branch: !Array.isArray(res.data.details) ? res.data.details : null,
            loading: false,
            error: null,
        });

        return res.data.details;
    },

    createBranch: async (formData) => {
        const res = await api.post(`${import.meta.env.VITE_API_URI}${PATH.BRANCHES_ROUTE}`,
            formData,
            {
                headers: multipart
            }
        );
        set({ branch: res.data.details, loading: false, error: null });

        return res.data.details;
    },

    updateBranchById: async (id, formData) => {
        const res = await api.put(`${import.meta.env.VITE_API_URI}${PATH.EDIT_BRANCH_ROUTE.replace(":id", id)}`,
            formData,
            {
                headers: multipart
            }
        )

        set({ branch: res.data.details, loading: false, error: null });

        return res.data.details;

    },
    deleteBranchById: async (id) => {
        const res = await api.delete(`${import.meta.env.VITE_API_URI}${PATH.BRANCH_ID_ROUTE.replace(":id", id)}`);
        set({ branch: res.data.details, loading: false, error: null });
    }

}))