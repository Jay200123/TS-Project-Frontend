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
    isAuthorized: boolean; 
    image: Image[];
}

interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;
    getAllUsers: () => Promise<void>;
    getOneUser: (id: string) => Promise<void>;
    createUser: (formData: FormData) => Promise<void>;
    updateUserById: (id: string, formData: FormData) => Promise<void>;
    deleteUserById: (id: string) => Promise<void>;
}

export type { User, UserState };   