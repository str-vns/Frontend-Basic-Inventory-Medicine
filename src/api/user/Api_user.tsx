import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { userLogin, Users, PersistUserState } from "@/types/user";
import { BaseURL } from "@assets/base/index";
import { showToast } from "@/shared/Sonner/toast";
import { devError, devLog } from "@/utils/generalHelpers";


interface UserStore {
  user: Users;
  loading: boolean;
  error: string | null;
  success: boolean;
  login: (data: userLogin) => Promise<void>;
  logout: () => void;
}

interface TokenStore {
    user_Token: string;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    url: "",
  },
  loading: false,
  error: null,
  success: false,

  login: async(data: userLogin) => {
    set({ loading: true, error: null, success: false });
    console.log("Logging in with data:", data);

    const headers = {
        "Content-Type": "application/json",
    }
    try {
      const response = await axios.post(`${BaseURL}user/login`, data, { headers });
      set({ user: response.data, loading: false, success: true });
      usePersistUser.getState().saveUsers({
        id: response.data.id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        url: response.data.url,
      });
      usePersistUser.getState().saveToken({
        user_Token: response.data.token,
        });
      usePersistUser.getState().saveAuth(true);
      showToast({
        title: "Success",
        description: "Login successful",
        type: "success",
      });
      devLog(`User logged in successfully: ${JSON.stringify(response.data)}`);
        set({ loading: false, error: null, success: true });
    } catch (error: unknown) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || "Unknown error";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ loading: false, error: errorMessage, success: false });
      devError(`Login failed: ${errorMessage}`);
      showToast({
        title: "Error",
        description: `${errorMessage}`,
        type: "error",
      });
    }
  },

  logout: async () => {
  const saveUser = usePersistUser.getState().users;
  const token = usePersistUser.getState().token.user_Token;
  set({ loading: true, error: null, success: false });

  try {
    await axios.post(`${BaseURL}user/logout`, { user_id: saveUser.id }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    set({ loading: false, success: true });

    // Reset Zustand state
    usePersistUser.setState({
      users: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        url: "",
      },
      token: {
        user_Token: "",
      },
      isAuth: false,
    });

    usePersistUser.persist.clearStorage();
  } catch (error) {
    set({ loading: false, error: error instanceof Error ? error.message : "Unknown error", success: false });
  }
}
}));


export const usePersistUser = create<PersistUserState>()(
    persist(
        (set) => ({
            users: {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                url: "",
            },
            token: {
                user_Token: "",
            },
            isAuth: false,
            saveUsers: (user: Users) => {
                set({ users: user });
                
            },
            saveToken: (tokenk: TokenStore) => {
                set({ token : tokenk });
            },
            saveAuth: (isAuth: boolean) => {
                set({ isAuth });
            }
        }),
        {
            name: 'userInfo',
            storage: createJSONStorage(() => localStorage),
            partialize: (state: PersistUserState) => ({
                users: state.users,
                token: state.token,
                isAuth: state.isAuth,
            }),
        }
    )
);