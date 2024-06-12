import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUserProfile = {
  id?: string;
  login?: string;
  email?: string;
};

export type TUserSlice = {
  isAuthorized: boolean;
  userProfile: TUserProfile;
};

const initialState: TUserSlice = {
  isAuthorized: false,
  userProfile: {},
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<TUserSlice['isAuthorized']>) {
      state.isAuthorized = action.payload;
    },

    setUserProfile(state, action: PayloadAction<TUserSlice['userProfile']>) {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
  },
});

export const {
  setIsAuthorized,
  setUserProfile,
} = userSlice.actions;
export default userSlice.reducer;
