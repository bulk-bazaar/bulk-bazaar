import {Action, Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {Product} from "../components1/redux/interfaces";
import {createAppSlice} from "./createAppSlice";
import ApiService from "../components1/network/ApiService";
import {waitForSeconds} from "../components1/common/util/functions";

const initialState: {
    myitems: Product[];
    items: Product[];
    current?: Product;
    loading: boolean,
    error: string | undefined
} = {
    items: [],
    myitems: [],
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
                const globalState: any = thunkApi.getState();
                const pincode = globalState.address.addresess[0].pincode;
                const apiService = new ApiService();
                const response = await apiService.post(`/api/products`, {
                    title: product.title,
                    description: product.description,
                    minimumQuantity: product.minimumQuantity,
                    maximumQuantity: product.maximumQuantity,
                    mrp: product.mrp,
                    price: product.price,
                    units: product.units,
                    sellerId: product.sellerId,
                    pincode: pincode
                });
                await waitForSeconds(1);
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
                    // state.items.push(action.payload)
                },
            }
        ),
        fetchProducts: create.asyncThunk(
            async (s: string, thunkApi) => {
                const globalState: any = thunkApi.getState();
                const pincode = globalState.address.addresess[0].pincode;
                const apiService = new ApiService();
                const response = await apiService.get(`/api/products?pincode=${pincode}`);
                await waitForSeconds(1);
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
                    state.items = action.payload.data
                },
            }
        ),
        fetchMyProducts: create.asyncThunk(
            async (s: string, thunkApi) => {
                const globalState: any = thunkApi.getState();
                const pincode = globalState.address.addresess[0].pincode;
                const apiService = new ApiService();
                const response = await apiService.get(`/api/products/my?pincode=${pincode}`);
                await waitForSeconds(1);
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
                    state.myitems = action.payload.data || []
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
