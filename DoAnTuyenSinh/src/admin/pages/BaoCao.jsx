import React from "react";

function BaoCao() {
  return (
    <div className="p-8 min-h-[60vh] flex flex-col items-center bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📊 Trang Báo cáo</h1>
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="p-2 border rounded">
            <option>Năm 2025</option>
            <option>Năm 2024</option>
          </select>
          <select className="p-2 border rounded">
            <option>Tất cả ngành</option>
            <option>CNTT</option>
            <option>Kinh doanh</option>
          </select>
          <select className="p-2 border rounded">
            <option>Tất cả trạng thái</option>
            <option>Đã duyệt</option>
            <option>Chờ xử lý</option>
            <option>Từ chối</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-700">1,234</div>
            <div className="text-gray-600">Tổng hồ sơ</div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-700">987</div>
            <div className="text-gray-600">Đã duyệt</div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-yellow-700">123</div>
            <div className="text-gray-600">Chờ xử lý</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 mb-8 text-center border border-dashed border-blue-200">
          <div className="text-lg font-semibold mb-2">Biểu đồ số lượng hồ sơ theo thời gian</div>
          <div className="h-40 flex items-center justify-center text-blue-300">[Placeholder Line Chart]</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-green-200">
          <div className="text-lg font-semibold mb-2">Top ngành hot</div>
          <div className="h-32 flex items-center justify-center text-green-300">[Placeholder Pie/Bar Chart]</div>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-white p-6 rounded-xl shadow text-left">
          <div className="font-bold mb-2">Gợi ý chức năng nâng cao:</div>
          <ul className="list-disc ml-6 text-gray-600 text-sm">
            <li>Lọc theo năm, tháng, ngành, trạng thái</li>
            <li>Biểu đồ động (Chart.js, Recharts...)</li>
            <li>Top trường THPT có nhiều hồ sơ nhất</li>
            <li>Export báo cáo PDF/Excel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BaoCao;
