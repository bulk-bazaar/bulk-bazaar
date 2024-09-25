import {Action, Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {Product} from "../components1/redux/interfaces";
import {waitForSeconds} from "../components1/common/util/functions";
import {createAppSlice} from "./createAppSlice";

const initialState: {
    items: Product[];
    loading: boolean,
    error: string | undefined
} = {
    items: [],
    loading: false,
    error: undefined
};

const tasksSlice = createAppSlice({
    name: "products",
    initialState: initialState,
    reducers: (create) => ({
        addProducts: create.reducer<Product[]>((state, action) => {
            state.items = [...state.items, ...action.payload];
        }),
        removeProduct: create.reducer<Product>((state, action) => {
            state.items = state.items.filter(it => it.id !== action.payload.id);
        }),
        fetchTodo: create.asyncThunk(
            async (id: string, thunkApi) => {
                await waitForSeconds(3)
                console.log('GAJENDRA'," action.payload")
                return 4
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false
                },
                fulfilled: (state, action) => {
                    state.loading = false
                    console.log('GAJENDRA', action.payload)
                    // state.items.push(action.payload)
                },
            }
        ),
    })
});
/*reducers: {
    addProducts(state, action: PayloadAction<Product[]>){
        state.items = [...state.items, ...action.payload];
    },
    removeProduct(state, action: PayloadAction<Product>) {
        state.items = state.items.filter(it => it.id !== action.payload.id);
    },
},*/

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
