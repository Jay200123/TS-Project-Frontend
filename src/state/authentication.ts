import { create } from "zustand";
import { encryptedSessionStorage } from "../storage";
import axios from "axios";
import { persist } from "zustand/middleware";
import { AuthState } from "../interface";
import { PATH } from "../constants";

const useAuthenticationStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        isAuth: false,
        loading: false,
        error: null,
        login: async (email, password) => {
            const res = await axios.post(`${import.meta.env.VITE_URI}${import.meta.env.VITE_API}${PATH.USER_LOGIN}`,
                {
                    email,
                    password
                },
            );

            if (res.data.success === false) {
                set(
                    {
                        user: null,
                        isAuth: false,
                        loading: false,
                        error: res.data.error.message,
                    }
                );
            }
            set(
                {
                    user: res.data.details,
                    isAuth: true,
                    loading: false,
                    error: null,
                }
            );

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
        }
    }), {
        name: "user-auth",
        storage: encryptedSessionStorage,
    })
);

export default useAuthenticationStore;