import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TrangChu from "./pages/TrangChu";
import ThongTinTuyenSinh from "./pages/ThongTinTuyenSinh";
import DangKyXetTuyen from "./pages/DangKyXetTuyen";
import TraCuuKetQua from "./pages/TraCuuKetQua";
import LienHe from "./pages/LienHe";
import ThanhHeader from "./components/ThanhHeader";
import ChanTrang from "./components/ChanTrang";
import ScrollToTop from "./components/ScrollToTop";
import DangNhap from "./accounts/DangNhap";
import DangKyTaiKhoan from "./accounts/DangKyTaiKhoan";
import DangKyTaiKhoanAdmin from "./accounts/DangKyTaiKhoanAdmin";
import QuenMatKhau from "./accounts/QuenMatKhau";
import FAQ from "./pages/FAQ";
import { UserContextProvider } from "./accounts/UserContext";
import DangKyHocBong from "./pages/DangKyHocBong";
import DangKyTuVan from "./pages/DangKyTuVan";
import EditProfile from "./pages/EditProfile";

// Admin Components
import AdminLayout from "./admin/components/AdminLayout";
import TongQuan from "./admin/pages/TongQuan";
import QuanLyHoSo from "./admin/pages/QuanLyHoSo";
import QuanLyFAQ from "./admin/pages/QuanLyFAQ";
import BaoCao from "./admin/pages/BaoCao";
import CaiDat from "./admin/pages/CaiDat";

function App() {
  return (
    <HelmetProvider>
      <UserContextProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/tong-quan" element={
              <AdminLayout currentPage="tong-quan">
                <TongQuan />
              </AdminLayout>
            } />
            <Route path="/admin/quan-ly-ho-so" element={
              <AdminLayout currentPage="quan-ly-ho-so">
                <QuanLyHoSo />
              </AdminLayout>
            } />
            <Route path="/admin/quan-ly-faq" element={
              <AdminLayout currentPage="quan-ly-faq">
                <QuanLyFAQ />
              </AdminLayout>
            } />
            <Route path="/admin/bao-cao" element={
              <AdminLayout currentPage="bao-cao">
                <BaoCao />
              </AdminLayout>
            } />
            <Route path="/admin/cai-dat" element={
              <AdminLayout currentPage="cai-dat">
                <CaiDat />
              </AdminLayout>
            } />
            <Route path="/admin/chinh-sua-ho-so" element={
              <AdminLayout currentPage="chinh-sua-ho-so">
                <EditProfile />
              </AdminLayout>
            } />
            
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <ThanhHeader />
                <Routes>
                  <Route path="/" element={<TrangChu />} />
                  <Route path="/thong-tin-tuyen-sinh" element={<ThongTinTuyenSinh />} />
                  <Route path="/dang-ky-xet-tuyen" element={<DangKyXetTuyen />} />
                  <Route path="/tra-cuu-ket-qua" element={<TraCuuKetQua />} />
                  <Route path="/lien-he" element={<LienHe />} />
                  <Route path="/accounts/dang-nhap" element={<DangNhap />} />
                  <Route path="/accounts/dang-ky" element={<DangKyTaiKhoan />} />
                  <Route path="/accounts/dang-ky-admin" element={<DangKyTaiKhoanAdmin />} />
                  <Route path="/accounts/quen-mat-khau" element={<QuenMatKhau />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/dang-ky-hoc-bong" element={<DangKyHocBong />} />
                  <Route path="/dang-ky-tu-van" element={<DangKyTuVan />} />
                  <Route path="/chinh-sua-ho-so" element={<EditProfile />} />
                </Routes>
                <ChanTrang />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </HelmetProvider>
  );
}

export default App;
