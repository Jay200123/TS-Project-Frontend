import { Image } from "./image";

interface Branch {
    _id: string;
    branch_name: string;
    address: string;
    phone: string;
    email: string;
    image: Image[];
}

interface BranchState {
    branches: Branch[];
    branch: Branch | null;
    loading: boolean;
    error: string | null;
    getAllBranches: () => Promise<Branch[]>;
    getOneBranch: (id: string) => Promise<Branch | null>;
    createBranch: (formData: FormData) => Promise<Branch>;
    updateBranchById: (id: string, formData: FormData) => Promise<Branch>;
    deleteBranchById: (id: string) => Promise<void>;
}


export type { Branch, BranchState };