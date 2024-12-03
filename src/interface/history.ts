import { Ticket } from "./ticket";

interface History {
    _id: string;
    ticket: Ticket;
    device_status: string;
}

interface HistoryState {
    histories: History[];
    history: History | null;
    loading: boolean;
    error: string;
    getAllHistories: ()=>Promise<History[]>;
    getOneHistory: (id: string)=>Promise<History>; 
    deleteHistoryById: (id: string)=>Promise<void>;
}

export type { History, HistoryState };