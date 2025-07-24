import React from "react";

function CaiDat() {
  return (
    <div className="p-8 min-h-[60vh] flex flex-col items-center bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-green-700 mb-4">⚙️ Trang Cài đặt</h1>
      <div className="w-full max-w-2xl mb-8">
        <form className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Tên hệ thống/trường</label>
            <input className="w-full p-2 border rounded" placeholder="Nhập tên trường..." />
          </div>
          <div>
            <label className="block font-semibold mb-1">Logo</label>
            <input type="file" className="w-full" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email liên hệ</label>
            <input className="w-full p-2 border rounded" placeholder="Nhập email..." />
          </div>
          <div>
            <label className="block font-semibold mb-1">Cấu hình thông báo</label>
            <input className="w-full p-2 border rounded" placeholder="Cấu hình thông báo..." />
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Lưu thay đổi</button>
        </form>
      </div>
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-white p-6 rounded-xl shadow text-left">
          <div className="font-bold mb-2">Quản lý tài khoản admin (placeholder):</div>
          <ul className="list-disc ml-6 text-gray-600 text-sm">
            <li>Thêm/xóa/sửa admin</li>
            <li>Đổi mật khẩu admin</li>
            <li>Phân quyền quản trị</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CaiDat; 