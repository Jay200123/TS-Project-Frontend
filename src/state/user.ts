import { create } from "zustand";
import { UserState } from "../interface";
import axios from "axios";
import api from "./api";
import { multipart } from "./multipart";
import { PATH } from "../constants";

const useUserStore = create<UserState>((set) => ({
  users: [],
  user: null,
  loading: false,
  error: null,
  getAllUsers: async () => {
    const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.USERS_ROUTE}`);
    set({ users: res.data.details, loading: false, error: null });

    return res.data.details;
  },

  getOneUser: async (id) => {
    const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.USER_ID_ROUTE.replace(":id", id)}`);
    set({
      user: !Array.isArray(res.data.details) ? res.data.details : null,
      loading: false,
      error: null,
    });
    return res.data.details;
  },

  createUser: async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URI}${PATH.USERS_ROUTE}`,
      formData,
      {
        headers: multipart
      }
    );
    set({ user: res.data.details, loading: false, error: null });
    return res.data.details;
  },

  updateUserById: async (id, formData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_USER_ROUTE.replace(":id", id)}`,
      formData,
    );

    set({ user: res.data.details, loading: false, error: null });
    return res.data.details;
  },

  deleteUserById: async (id) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.USER_ID_ROUTE.replace(":id", id)}`
    );

    set({ user: res.data.details, loading: false, error: null });
  },

  changePassword: async (id, formData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.CHANGE_PASSWORD_ROUTE.replace(":id", id)}`,
      formData,
      {
        headers: multipart
      }
    );

    if(!res){
      set({ user: null, loading: false, error: "Incorrect Password" }); 
    }

    set({ user: res.data.details, loading: false, error: null });
    return res.data.details;
  },
  resetPassword: async (id) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.RESET_PASSWORD_ROUTE.replace(":id", id)}`
    );

    set({ user: res.data.details, loading: false, error: null });
  }

}));

export { useUserStore };
