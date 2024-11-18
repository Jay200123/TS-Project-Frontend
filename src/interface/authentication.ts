import { User } from "./user";

interface AuthenticationValues {
    email: string;
    password: string;   
}

interface AuthState {
    user: User | null;   
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
}

export type { AuthState, AuthenticationValues};