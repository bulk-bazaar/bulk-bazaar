import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import DoneTasks from "../Routes/DoneTasks";
import Home from "../Routes/Home";
import SearchResults from "../Routes/SearchResults";
import TaskOnly from "../Routes/TaskOnly";
import Login from "../Routes/login/Login";
import SignUpPage from "../Routes/login/signup/SignUpPage";
import ForgotPasswordPage from "../Routes/login/fogotpassword/ForgotPasswordPage";
import VerifyOTPPage from "../Routes/login/verifyotp/VerifyOTP";
import ProductDetailPage from "../Routes/product/ProductDetailPage";
import CheckoutPage from "../Routes/order/CheckoutPage";
import OrderPage from "../Routes/OrderPage";
import SellerRequestPage from "../Routes/seller/SellerRequestPage";


const ProductsSection: React.FC = () => {
    return (
        // <main className="flex w-full pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-10/12 xl:absolute xl:left-[16%] m-auto min-h-screen">
        // <main className="flex bg-yellow-600 p-2">
        //   <HeaderTasks />
        <div className={'relative w-full'}>
            <div className={"ra pt-4"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/product" element={<ProductDetailPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/orders" element={<OrderPage/>}/>
                    <Route path="/verifyOTP/:email" element={<VerifyOTPPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/becomeSeller" element={<SellerRequestPage/>}/>
                    <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route
                        path="/completed"
                        element={<DoneTasks done={true} title="Completed tasks"/>}
                    />
                    <Route
                        path="/uncompleted"
                        element={<DoneTasks done={false} title="Uncompleted tasks"/>}
                    />
                    <Route path="/results" element={<SearchResults/>}/>
                    {/*<Route path="/dir/:dir" element={<Directory/>}/>*/}
                    <Route path="/task/:taskId" element={<TaskOnly/>}/>
                    <Route path="*" element={<Navigate to=""/>}/>
                </Routes>
            </div>
        </div>
        // {/*</main>*/}
    );
};

export default ProductsSection;
