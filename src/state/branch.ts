import { create } from "zustand";
import axios from "axios";
import { BranchState } from "../interface";

export const useBranchStore = create<BranchState>((set) => ({
    branches: [],
    branch: null,
    loading: false,
    error: null,
    getAllBranches: async () => {
        const res = await axios.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branches`);
        set({ branches: res.data.details, loading: false, error: null });

        return res.data.details;    
    },

    getOneBranch: async (id) => {
        const res = await axios.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branch/${id}`);
        set({
            branch: !Array.isArray(res.data.details) ? res.data.details : null,
            loading: false,
            error: null,
        });

        return res.data.details;
    },
    
    createBranch: async (formData) => {
        const res = await axios.post(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branches`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        set((state) => ({
            branches: [...state.branches, res.data.details],
            loading: false,
            error: null
        }));

        return  res.data.details;
    },

    updateBranchById: async (id, formData) => {
        const res = await axios.patch(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branch/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        set((state) => ({
            branches: state.branches.map((u) =>
                u._id === id ? res.data.details : u
            ),
        }));

        return res.data.details;    

    },
    deleteBranchById: async (id) => {
        await axios.delete(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branch/${id}`);
        set((state) => ({
            branches: state.branches.filter((u) => u._id !== id),
        }));
    }

}))