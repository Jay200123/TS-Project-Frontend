import { Device } from "./device";
import { Image } from "./image";
import { User } from "./user";

type TicketStatus = "new" | "pending" | "resolved" | "in-progress" | "closed";
type TicketCategory = "hardware" | "software" | "network";
type TicketLevel = "urgent" | "priority" | "non-urgent";

interface Ticket {
  _id: string;
  device: Device;
  description: string;
  date_submitted: Date;
  date_resolved: Date;
  status: TicketStatus;
  category: TicketCategory;
  level: TicketLevel;
  assignee: User;
  findings: string;
  image: Image[];
}

interface TicketState {
  tickets: Ticket[];
  ticket: Ticket | null;
  loading: boolean;
  error: string;
  getAllTickets: () => Promise<Ticket>;
  getOneTicket: (id: string) => Promise<Ticket>;
  createTicket: (formData: FormData) => Promise<void>;
  updateTicketById: (ticket: string, formData: FormData) => Promise<void>;
  deleteTicketById: (id: string) => Promise<void>;
  assignTicketById: (id: string, formData: FormData) => Promise<void>;  
  closeTicketById: (id: string) => Promise<void>; 
  claimTicketById: (id: string, assignee: string) => Promise<void>; 
}

export type { 
  Ticket, 
  TicketState,
  TicketStatus, 
  TicketCategory,
  TicketLevel
 };
