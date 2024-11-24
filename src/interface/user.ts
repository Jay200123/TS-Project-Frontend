import { Branch } from "./branch";
import { Department } from "./department";
import { Position } from "./position";
import { Image } from "./image";

interface User {
    _id: string;
    fname: string;
    lname: string;
    phone: string;
    address: string;
    city: string;
    email: string;
    password: string;
    role: string;
    branch: Branch;
    department: Department;
    position: Position;
    isAuthorized: boolean;
    image: Image[];
}

interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;
    getAllUsers: () => Promise<User[]>;
    getOneUser: (id: string) => Promise<User>;
    createUser: (formData: FormData) => Promise<User>;
    updateUserById: (id: string, formData: FormData) => Promise<User>;
    deleteUserById: (id: string) => Promise<User>;
}

export type { User, UserState };   