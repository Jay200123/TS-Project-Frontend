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
    image: Image[];
}

export type { User };   