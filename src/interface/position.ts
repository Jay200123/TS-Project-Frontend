import { Department } from "./department";

interface Position {
    department: Department;
    position_name: string;
    description: string;
}

export type { Position };
