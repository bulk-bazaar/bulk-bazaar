import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Directory from "../Routes/Directory";
import DoneTasks from "../Routes/DoneTasks";
import Home from "../Routes/Home";
import ImportantTasks from "../Routes/ImportantTasks";
import SearchResults from "../Routes/SearchResults";
import TaskOnly from "../Routes/TaskOnly";
import TodaysTasks from "../Routes/TodaysTasks";
import HeaderTasks from "./HeaderTasks";
import Footer from "../Footer";
import Login from "../Routes/login/Login";
import SignUpPage from "../Routes/login/signup/SignUpPage";
import ForgotPasswordPage from "../Routes/login/fogotpassword/ForgotPasswordPage";


const TasksSection: React.FC = () => {
  return (
    // <main className="flex w-full pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-10/12 xl:absolute xl:left-[16%] m-auto min-h-screen">
    // <main className="flex bg-yellow-600 p-2">
    //   <HeaderTasks />
      <Routes>
        <Route path="/bulk-bazaar" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/important" element={<ImportantTasks />} />
        <Route
          path="/completed"
          element={<DoneTasks done={true} title="Completed tasks" />}
        />
        <Route
          path="/uncompleted"
          element={<DoneTasks done={false} title="Uncompleted tasks" />}
        />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/dir/:dir" element={<Directory />} />
        <Route path="/task/:taskId" element={<TaskOnly />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    // {/*</main>*/}
  );
};

export default TasksSection;
