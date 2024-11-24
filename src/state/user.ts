import { create } from "zustand";
import { UserState } from "../interface";
import axios from "axios";
import api from "./api";

const useUserStore = create<UserState>((set) => ({
    users: [],
    user: null,
    loading: false,
    error: null,
    getAllUsers: async () => {
        const res = await api.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/users`);
        set({ users: res.data.details, loading: false, error: null });

        return res.data.details;
    },

    getOneUser: async (id) => {
        const res = await api.get(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/users/${id}`);
        set({
            user: !Array.isArray(res.data.details) ? res.data.details : null,
            loading: false,
            error: null,
        });
        return res.data.details;
    },

    createUser: async (formData) => {
        const res = await axios.post(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/users`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        set((state) => ({
            users: [...state.users, res.data.details],
            loading: false,
            error: null
        }))
        return res.data.details;
    },

    updateUserById: async (id, formData) => {
        const res = await api.patch(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/users/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        set((state) => ({
            users: state.users.map((u) =>
                u._id === id ? res.data.details : u
            ),
        }));
        return res.data.details;
    },

    deleteUserById: async (id) => {
        const res = await api.delete(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}/users/delete/${id}`);
        set((state) => ({
            users: state.users.filter((u) => u._id !== id),
            loading: false,
            error: null,
        }));
        return res.data.details;
    }
}));

export { useUserStore }