import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowProvider } from "../src/context/ShowContext";

import Layout from "./pages/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import NoPage from "./pages/NoPage";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import ShowDetailPage from "./pages/showdetailpage/ShowDetailPage";

export default function App() {
  return (
    <ShowProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="search" element={<Search />} />
            <Route path="/show-details" element={<ShowDetailPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShowProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
