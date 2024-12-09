import { create } from "zustand";
import { encryptedSessionStorage } from "../storage";
import axios from "axios";
import { persist } from "zustand/middleware";
import { AuthState } from "../interface";
import { PATH } from "../constants";

const useAuthenticationStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        loading: false,
        error: null,
        login: async (email, password) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URI}${PATH.USER_LOGIN}`,
                {
                    email,
                    password
                },
            );
            
            set(
                {
                    user: res.data.details,
                    loading: false,
                    error: null,
                }
            );

            sessionStorage.setItem("access", res.data.access);
            const user = res.data.details;

            return user;
        },
        logout: async () => {
            set(
                {
                    user: null,
                    loading: false,
                    error: null,
                }
            );
            sessionStorage.removeItem("user-auth");
            sessionStorage.removeItem("access");
        }
    }), {
        name: "user-auth",
        storage: encryptedSessionStorage,
    })
);

export default useAuthenticationStore;