import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function ChanTrang() {
  return (
    <footer className="bg-blue-700 text-white relative mt-10">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="mb-1">© 2025 HUTECH Tuyển Sinh. All rights reserved.</div>
          <div>
            Địa chỉ: 475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM | Hotline: 1900 2059 | Email: <a href="mailto:hutech@hutech.edu.vn" className="text-yellow-300 hover:underline">hutech@hutech.edu.vn</a>
          </div>
        </div>
        <Link
          to="/dang-ky-xet-tuyen"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg fixed md:static bottom-6 right-6 md:bottom-auto md:right-auto z-50"
        >
          <FaUserPlus className="text-xl" />
          ĐĂNG KÝ NGAY
        </Link>
      </div>
    </footer>
  );
}

export default ChanTrang; 