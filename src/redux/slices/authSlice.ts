import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper function to get user data from localStorage
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Define the initial state structure
interface AuthState {
  user: {
    _id: string;
    name: string;
    role: "user" | "admin";
    email: string;
    image?: string;
    shippingAddress?: string;
  } | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the user and token into state and localStorage
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },

    // Logout the user and clear from localStorage
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },

    // Update profile and persist it to localStorage
    updateProfile: (
      state,
      action: PayloadAction<{ name?: string; shippingAddress?: string; image?: string }>
    ) => {
      if (state.user) {
        // Update the user state with the new profile data
        state.user = { ...state.user, ...action.payload };
        
        // Persist updated user data in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setUser, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
