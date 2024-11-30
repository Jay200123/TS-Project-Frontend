import { Device } from "./device";
import { Image } from "./image";
import { User } from "./user";

type Status = "pending"| "resolved" | "in-progress" | "closed";
type Category = "hardware" | "software" | "network";
type Level = "urgent" | "priority" | "non-urgent";


interface Ticket {
    device: Device;
    description: string;    
    date_submitted: Date;
    date_resolved: Date;    
    status: Status;
    category: Category; 
    level: Level;
    assignee: User;
    image: Image[];

}

interface TicketState {
    tickets: Ticket[];
    ticket: Ticket;
    loading: boolean;
    error: string;
    getAllTickets: () => void;  
    getTicket: (id: string) => void;
    createTicket: (ticket: Ticket) => void;
    updateTicket: (ticket: Ticket) => void;
    deleteTicket: (id: string) => void;
    
}

