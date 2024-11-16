import { Image } from "./image";

interface Test {
    id: string;
    name: string;
    image: Image[];
}

interface TestState {
    tests: Test[];
    test: Test;
    loading: boolean;
    error: string | null;
    getTests: () => Promise<void>;
    getOneTest: (id: string) => Promise<void>;
    createTest: (formData: FormData) => Promise<void>;
    updateTestById: (id: string, formData: FormData) => Promise<void>;
    deleteTestById: (id: string) => Promise<void>;
}

export type {
    Test, 
    TestState
 };