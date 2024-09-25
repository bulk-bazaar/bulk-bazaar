import {Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction,} from "@reduxjs/toolkit";
import {Product} from "../components1/redux/interfaces";
import {waitForSeconds} from "../components1/common/util/functions";

const initialState: {
  items: Product[];
  loading: boolean,
  error: string | undefined
} = {
  items: [],
  loading: false,
  error: undefined
};

const tasksSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addProducts(state, action: PayloadAction<Product[]>){
      state.items = [...state.items, ...action.payload];
    },
    removeProduct(state, action: PayloadAction<Product>) {
      state.items = state.items.filter(it => it.id !== action.payload.id);
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => async (action: Action) => {
    const nextAction = next(action);
    await waitForSeconds(1000)
    if (action.type.startsWith("products/")) {
      console.log('GAJENDRA', action)
    }
 /*   const actionChangeOnlyDirectories =
      tasksActions.createDirectory.match(action);

    const isADirectoryAction: boolean = action.type
      .toLowerCase()
      .includes("directory");

    if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories) {
      const tasksList = store.getState().tasks.tasks;
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    if (action.type.startsWith("tasks/") && isADirectoryAction) {
      const dirList = store.getState().tasks.directories;
      localStorage.setItem("directories", JSON.stringify(dirList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("directories");
      localStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      console.log(JSON.parse(localStorage.getItem("tasks")!));
      if (localStorage.getItem("tasks")) {
        const localStorageTasks = JSON.parse(localStorage.getItem("tasks")!);
        if (localStorageTasks.length === 0) {
          localStorage.removeItem("tasks");
        }
      }
    }*/
    return nextAction;
  };
