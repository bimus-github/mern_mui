import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// commponents
import Layout from "../components/Layout";

// pages
import Notes from "../pages/Notes";
import Create from "../pages/Create";
import Signup from "../pages/Signup";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" exact element={<Notes />} />
      <Route path="create" element={<Create />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);
