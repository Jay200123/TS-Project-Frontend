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
    const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.TICKETS_ROUTE}`);
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

    set({ ticket: res.data.details, loading: false, error: "" });
  },

  updateTicketById: async (id: string, formData: FormData) => {
    const res = await api.put(
      `${import.meta.env.VITE_API_URI}${PATH.EDIT_TICKET_ROUTE.replace(
        ":id",
        id
      )}`,
      formData,
      {
        headers: multipart,
      }
    );

    set({ ticket: res.data.details, loading: false, error: "" });
  },

  deleteTicketById: async (id: string) => {
    const res = await api.delete(
      `${import.meta.env.VITE_API_URI}${PATH.TICKET_ID_ROUTE.replace(
        ":id",
        id
      )}`
    );
    set({ ticket: res.data.details, loading: false, error: "" });
  },

  assignTicketById: async (id: string, formData: FormData) => {
    const res = await api.patch(`${import.meta.env.VITE_API_URI}${PATH.ASSIGN_TICKET_ROUTE.replace(":id", id)}`, formData);
    set({ ticket: res.data.details, loading: false, error: "" });
  },
}));
