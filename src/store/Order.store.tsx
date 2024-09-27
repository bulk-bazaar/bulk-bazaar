import {CartItem} from "../components1/redux/interfaces";
import {createAppSlice} from "./createAppSlice";
import ApiService from "../components1/network/ApiService";

const initialState: {
    cartItems: CartItem[];
    loading: boolean;
} = {
    cartItems: [],
    loading: false
};

const ordersSlice = createAppSlice({
    name: "orders",
    initialState: initialState,
    reducers: (create) => ({
        addToCart: create.reducer<CartItem>((state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        }),
        clearCart: create.reducer((state, action) => {
            state.cartItems = []
        }),
        placeOrder: create.asyncThunk(
            async (f: string, thunkApi) => {
                const globalState: any = thunkApi.getState(); // Access entire state
                const apiService = new ApiService();
                const data = {
                    products: globalState.orders.cartItems.map((cartItem: CartItem) => {
                        return {
                            productId: cartItem.product.id,
                            quantity: cartItem.quantity,
                        }
                    })
                }
                const response = await apiService.post(`/api/orders`, data);
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
                },
            }
        ),
    })
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
