import { DeviceState } from "../interface";
import api from "./api";
import { create } from "zustand";
import { multipart } from "./multipart";
import { PATH } from "../constants";

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  device: null,
  loading: false,
  error: null,
  message: null,
  getAllDevices: async () => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.DEVICES_ROUTES}`
    );
    set({
      devices: res.data.details,
      message: res.data.message,
      loading: false,
      error: null,
    });

    return res.data.details;
  },

  getOneDevice: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.DEVICE_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({
      device: res.data.details,
      message: res.data.message,
      loading: false,
      error: null,
    });

    return res.data.details;
  },
  createDevice: async (formData: FormData) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.DEVICES_ROUTES}`,
      formData
    );
    set((state) => ({ devices: [...state.devices, res.data.details] }));
    return res.data.details;
  },

  updateDeviceById: async (id: string, formData: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_DEVICE_ROUTE.replace(
        ":id",
        id
      )}`,
      formData,
      {
        headers: multipart,
      }
    );

    set((state) => ({
      devices: state.devices.map((d) => (d?._id === id ? res.data.details : d)),
    }));
    return res.data.details;
  },
  deleteDeviceById: async (id: string) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.DEVICE_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );

    set((state) => ({
      devices: state.devices.filter((d) => d?._id !== id),
    }));
    return res.data.details;
  },
}));
