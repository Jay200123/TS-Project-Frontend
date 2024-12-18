import { create } from "zustand";
import { BorrowState } from "../interface";
import api from "./api";
import { multipart } from "./multipart";
import { PATH } from "../constants";

export const useBorrowStore = create<BorrowState>((set) => ({
  borrows: [],
  borrow: null,
  loading: false,
  error: null,
  getAllBorrows: async () => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.BORROWS_ROUTES}`
    );
    set({ borrows: res?.data?.details, loading: false, error: null });
    return res?.data?.details;
  },
  getOneBorrow: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.BORROW_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({ borrow: res?.data?.details, loading: false, error: null });
    return res?.data?.details;
  },
  createBorrow: async (data) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.BORROWS_ROUTES}`,
      data,
      {
        headers: multipart,
      }
    );
    set({ borrow: res?.data?.details, loading: false, error: null });
  },
  updateBorrowById: async (id, data) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_BORROW_ROUTE.replace(
        ":id",
        id
      )}`,
      data,
      {
        headers: multipart,
      }
    );
    set({ borrow: res?.data?.details, loading: false, error: null });
  },
  deleteBorrowById: async (id) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.BORROW_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({ borrow: res?.data?.details, loading: false, error: null });
  },
}));
