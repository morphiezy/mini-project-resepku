import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../apollo-client";
import { GET_USER } from "../../GraphQL/User/queries";

const initialState = {
  id: "",
  username: "",
  fullname: "",
  authenticated: false,
};

const login = createAsyncThunk("user/login", async (dataLogin) => {
  const response = await client.query({
    query: GET_USER,
    variables: dataLogin,
    notifyOnNetworkStatusChange: true,
  });

  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => ({ initialState }),
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload.data.user.length === 0) return state;

      const user = payload.data?.user[0];

      state.id = user?.id;
      state.username = user?.username;
      state.fullname = user?.fullname;
      state.authenticated = true;
    });
  },
});

const { logout } = userSlice.actions;

export { login, logout };
export default userSlice.reducer;
