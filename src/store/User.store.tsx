import {createAppSlice} from "./createAppSlice";
import {User} from "../components1/redux/interfaces";

const initialState: {
  token: string,
  user: User | {}
} = {
  token: '',
  user: {}
};

const userSlice = createAppSlice({
  name: "user",
  initialState: initialState,
  reducers: (create) => ({
    setToken: create.reducer<string>((state, action) => {
      state.token = action.payload;
    }),
    setUser: create.reducer<User>((state, action) => {
      state.user = action.payload;
    }),
  })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
