import { create } from "zustand";
import api from "./api";
import { multipart } from "./multipart";
import { TicketState } from "../interface";
import { PATH } from "../constants";

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  ticket: null,
  loading: false,
  error: "",
  getAllTickets: async () => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.TICKETS_ROUTE}`
    );
    set({
      tickets: res.data.details,
      loading: false,
      error: "",
    });

    return res?.data?.details;
  },

  getOneTicket: async (id: string) => {
    const res = await api.get(
      `${import.meta.env.VITE_API_URI}${PATH.TICKET_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({
      ticket: res.data.details,
      loading: false,
      error: "",
    });

    return res?.data?.details;
  },

  createTicket: async (formData: FormData) => {
    const res = await api.post(
      `${import.meta.env.VITE_API_URI}${PATH.TICKETS_ROUTE}`,
      formData,
      {
        headers: multipart,
      }
    );
    set((state) => ({
      tickets: [...state.tickets, res.data.details],
      loading: false,
      error: "",
    }));
  },

  updateTicketById: async (id: string, formData: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_TICKET_ROUTE.replace(
        ":id",
        id
      )}`,
      formData
    );

    set((state) => ({
      tickets: state?.tickets?.map((t) =>
        t?._id == id ? res.data.details : t
      ),
      loading: false,
      error: "",
    }));
  },

  deleteTicketById: async (id: string) => {
    await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.TICKET_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set((state) => ({
      tickets: state?.tickets?.filter((t) => t?._id !== id),
    }));
  },

  assignTicketById: async (id: string, formData: FormData) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.ASSIGN_TICKET_ROUTE.replace(
        ":id",
        id
      )}`,
      formData
    );
    set((state) => ({
      tickets: state?.tickets?.map((t) =>
        t?._id == id ? res.data.details : t
      ),
      loading: false,
      error: "",
    }));
  },

  closeTicketById: async (id: string) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.CLOSET_TICKET_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set((state) => ({
      tickets: state?.tickets?.map((t) =>
        t?._id == id ? res.data.details : t
      ),
      loading: false,
      error: "",
    }));
  },

  claimTicketById: async (id: string, assignee: string) => {
    const res = await api.patch(
      `${import.meta.env.VITE_API_URI}${PATH.CLAIM_TICKET_ID_ROUTE.replace(
        ":id",
        id
      )}`,
      {
        assignee,
      }
    );

    set((state) => ({
      tickets: state?.tickets?.map((t) =>
        t?._id == id ? res.data.details : t
      ),
      loading: false,
      error: "",
    }));
  },
}));
