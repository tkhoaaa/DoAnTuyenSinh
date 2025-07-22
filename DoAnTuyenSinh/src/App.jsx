import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import ThongTinTuyenSinh from "./pages/ThongTinTuyenSinh";
import DangKyXetTuyen from "./pages/DangKyXetTuyen";
import TraCuuKetQua from "./pages/TraCuuKetQua";
import LienHe from "./pages/LienHe";
import ThanhHeader from "./components/ThanhHeader";
import ChanTrang from "./components/ChanTrang";
import DangNhap from "./accounts/DangNhap";
import DangKyTaiKhoan from "./accounts/DangKyTaiKhoan";
import DangKyTaiKhoanAdmin from "./accounts/DangKyTaiKhoanAdmin";
import QuenMatKhau from "./accounts/QuenMatKhau";
import FAQ from "./pages/FAQ";
import { UserContextProvider } from "./accounts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <ThanhHeader />
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/thong-tin-tuyen-sinh" element={<ThongTinTuyenSinh />} />
          <Route path="/dang-ky-xet-tuyen" element={<DangKyXetTuyen />} />
          <Route path="/tra-cuu-ket-qua" element={<TraCuuKetQua />} />
          <Route path="/lien-he" element={<LienHe />} />
          <Route path="/accounts/dang-nhap" element={<DangNhap />} />
          <Route path="/accounts/dang-ky" element={<DangKyTaiKhoan />} />
          <Route
            path="/accounts/dang-ky-admin"
            element={<DangKyTaiKhoanAdmin />}
          />
          <Route path="/accounts/quen-mat-khau" element={<QuenMatKhau />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <ChanTrang />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
