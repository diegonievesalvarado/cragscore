import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import GymDetail from "./pages/GymDetail.jsx";
import AddReview from "./pages/AddReview.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gyms/:id" element={<GymDetail />} />
        <Route path="/gyms/:id/review" element={<AddReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}