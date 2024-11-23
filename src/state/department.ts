import { create } from "zustand";
import axios from "axios";
import { DepartmentState } from "../interface";

export const useDepartmentStore = create<DepartmentState>((set) => ({
    departments: [],
    department: null,
    loading: false,
    error: null,
    getAllDepartments: async () => {
        const res = await axios.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/departments`);
        set({ departments: res.data.details, loading: false, error: null });

        return res.data.details;
    },
    getOneDepartment: async (id: string) => {
        const res = await axios.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/branches/${id}`);
        set({
            department: !Array.isArray(res.data.details) ? res.data.details : null,
            loading: false,
            error: null,
        });

        return res.data.details;
    },
    createDepartment: async (formData: FormData) => {
        const res = await axios.post(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/departments`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        set((state) => ({
            departments: [...state.departments, res.data.details],
            loading: false,
            error: null
        }));

        return res.data.details;
    },
    updateDepartmentById: async (id: string, formData: FormData) => {
        const res = await axios.patch(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/departments/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        set((state) => ({
            departments: state.departments.map((u) =>
                u._id === id ? res.data.details : u
            ),
        }));

        return res.data.details;
    },

    deleteDepartmentById: async (id: string) => {
        const res = await axios.delete(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/departments/delete/${id}`);
        set((state) => ({
            departments: state.departments.filter((u) =>
                u._id !== id
            ),
        }));

        return res.data.details;
    }
}))