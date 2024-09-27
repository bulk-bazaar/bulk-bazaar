import {Action, Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {Product} from "../components1/redux/interfaces";
import {createAppSlice} from "./createAppSlice";
import ApiService from "../components1/network/ApiService";
import {waitForSeconds} from "../components1/common/util/functions";

const initialState: {
    items: Product[];
    current?: Product;
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
        addCurrentProduct: create.reducer<Product>((state, action) => {
            state.current = action.payload
        }),
        removeProduct: create.reducer<Product>((state, action) => {
            state.items = state.items.filter(it => it.id !== action.payload.id);
        }),
        addProducts: create.asyncThunk(
            async (product: Product, thunkApi) => {
                const globalState = thunkApi.getState(); // Access entire state
                const apiService = new ApiService();
                const response = await apiService.post(`/api/products`, {
                    title: product.title,
                    description: product.description,
                    minimumQuantity: product.minimumQuantity,
                    maximumQuantity: product.maximumQuantity,
                    mrp: product.mrp,
                    price: product.price,
                    units: product.units,
                    sellerId: '12'
                });
                await waitForSeconds(2);
                return response?.data
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
                    state.items.push(action.payload)
                },
            }
        ),
        fetchProducts: create.asyncThunk(
            async (thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.get(`/api/products`);
                await waitForSeconds(2);
                return response?.data
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
                    state.items = action.payload
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
        // await waitForSeconds(1000)
        // if (action.type.startsWith("products/")) {
        //     console.log('GAJENDRA', action)
        // }
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
