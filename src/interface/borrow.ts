import { User } from "./user";
import { Equipment } from "./equipment";

interface Borrow {
  _id: string;
  user: User;
  lender: User;
  equipment: Equipment;
  serial_number: string;
  reason: string;
  borrow_date: Date;
  return_date: Date;
  status: string;
  quantity: number;
  counter: number;
  borrowNumber: string;
  signature: string;  
  createdAt: Date;
}

interface BorrowState {
  borrows: Borrow[];
  borrow: Borrow | null;
  loading: boolean;
  error: string | null;
  getAllBorrows: () => Promise<Borrow[]>;
  getOneBorrow: (id: string) => Promise<Borrow | null>;
  createBorrow: (data: FormData) => Promise<void>;
  updateBorrowById: (id: string, data: FormData) => Promise<void>;
  deleteBorrowById: (id: string) => Promise<void>;
}

export type { Borrow, BorrowState };
