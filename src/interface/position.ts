import { Department } from "./department";

interface Position {
  _id: string;
  department: Department;
  position_name: string;
  description: string;
}

interface PositionState {
  positions: Position[];
  position: Position | null;
  loading: boolean;
  error: string | null;
  getAllPositions: () => Promise<Position[]>;
  getOnePosition: (id: string) => Promise<Position | null>;
  createPosition: (formData: FormData) => Promise<Position>;
  updatePositionById: (id: string, formData: FormData) => Promise<Position>;
  deletePositionById: (id: string) => Promise<Position>;
}

export type { Position, PositionState };
