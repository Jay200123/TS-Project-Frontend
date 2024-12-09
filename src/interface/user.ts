import { Branch } from "./branch";
import { Department } from "./department";
import { Position } from "./position";
interface User {
    _id: string;
    idnumber: string;
    fullname: string;   
    phone: string;
    email: string;
    password: string;
    role: string;
    branch: Branch;
    department: Department;
    position: Position;
    isPasswordChanged: boolean;  
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
    deleteUserById: (id: string) => Promise<void>; 
    changePassword: (id: string, formData: FormData) => Promise<User>;  
    resetPassword: (id: string) => Promise<void>;  
}

export type { User, UserState };   