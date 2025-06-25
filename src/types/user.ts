export const initialUser = {
    loading: false,
    error: null,
    success: false,
    data: [],
}

export interface userLogin {
    email: string;
    password: string;
}

export interface Users {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    url: string;
}

interface TokenStore {
    user_Token: string;
}

export type PersistUserState = {
    users: Users;
    token: {
        user_Token: string;
    };
    isAuth: boolean;
    saveUsers: (user: Users) => void;
    saveToken: (token: TokenStore) => void;
    saveAuth: (isAuth: boolean) => void;
};