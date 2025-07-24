import React from "react";
import SEO from "../components/SEO";

function ThongTinTuyenSinh() {
  return (
    <>
      <SEO
        title="Thông tin tuyển sinh"
        description="Thông tin tuyển sinh HUTECH 2025 - Điều kiện xét tuyển, ngành đào tạo, hồ sơ đăng ký và lịch tuyển sinh chi tiết."
        keywords="thông tin tuyển sinh, HUTECH, điều kiện xét tuyển, ngành đào tạo, hồ sơ, lịch tuyển sinh"
        canonical="/thong-tin-tuyen-sinh"
      />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Thông tin tuyển sinh</h1>
        <p>
          Trang này sẽ cung cấp các thông tin về ngành đào tạo, điều kiện xét
          tuyển, hồ sơ và lịch tuyển sinh.
        </p>
      </div>
    </>
  );
}

export default ThongTinTuyenSinh;
