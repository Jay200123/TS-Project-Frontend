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
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.BRANCHES_ROUTE}`
    );
    set({ branches: res.data.details, loading: false, error: null });

    return res.data.details;
  },

  getOneBranch: async (id) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.BRANCH_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({
      branch: !Array.isArray(res.data.details) ? res.data.details : null,
      loading: false,
      error: null,
    });

    return res.data.details;
  },

  createBranch: async (formData) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.BRANCHES_ROUTE}`,
      formData,
      {
        headers: multipart,
      }
    );
    set((state) => ({ branches: [...state.branches, res?.data?.details] }));

    return res.data.details;
  },

  updateBranchById: async (id, formData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_BRANCH_ROUTE.replace(
        ":id",
        id
      )}`,
      formData,
      {
        headers: multipart,
      }
    );

    set((state) => ({
      branches: state?.branches?.map((b) =>
        b?._id == id ? res?.data?.details : b
      ),
    }));

    return res.data.details;
  },
  deleteBranchById: async (id) => {
    await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.BRANCH_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set((state) => ({
      branches: state?.branches?.filter((b) => b?._id !== id),
    }));
  },
}));
