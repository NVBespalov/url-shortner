import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  // при необходимости добавьте другие поля
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.error = null;
    },
    clearProfile(state) {
      state.profile = null;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProfile, clearProfile, setLoading, setError } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export type { UserProfile };
