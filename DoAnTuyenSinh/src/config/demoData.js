// Demo Data for Admin Dashboard
// Used when backend is not available (e.g., on Vercel deployment)

export const DEMO_USER = {
    id: 999,
    username: "demo_admin",
    email: "demo@hutech.edu.vn",
    full_name: "Demo Admin",
    role: "admin",
    phone: "+84 123 456 789"
};

export const DEMO_DASHBOARD_STATS = {
    total_applications: 1247,
    pending_applications: 89,
    approved_applications: 876,
    rejected_applications: 282,
    total_users: 1568,
    total_majors: 45,
    total_consultations: 234,
    total_scholarships: 156,
    recent_applications: [{
            id: 1,
            application_code: "HS2025001",
            ho_ten: "Nguyễn Văn An",
            email: "nguyenvanan@email.com",
            major_name: "Công nghệ Thông tin",
            status: "pending",
            phuong_thuc_xet_tuyen: "hoc_ba",
            created_at: "2025-01-02T10:30:00Z"
        },
        {
            id: 2,
            application_code: "HS2025002",
            ho_ten: "Trần Thị Bình",
            email: "tranthibinh@email.com",
            major_name: "Kinh tế",
            status: "approved",
            phuong_thuc_xet_tuyen: "thi_thpt",
            khoi_thi: "A00",
            created_at: "2025-01-02T09:15:00Z"
        },
        {
            id: 3,
            application_code: "HS2025003",
            ho_ten: "Lê Minh Châu",
            email: "leminhchau@email.com",
            major_name: "Thiết kế Đồ họa",
            status: "rejected",
            phuong_thuc_xet_tuyen: "danh_gia_nang_luc",
            created_at: "2025-01-01T16:45:00Z"
        },
        {
            id: 4,
            application_code: "HS2025004",
            ho_ten: "Phạm Quốc Duy",
            email: "phamquocduy@email.com",
            major_name: "Quản trị Kinh doanh",
            status: "pending",
            phuong_thuc_xet_tuyen: "hoc_ba",
            created_at: "2025-01-01T14:20:00Z"
        },
        {
            id: 5,
            application_code: "HS2025005",
            ho_ten: "Võ Thị Hương",
            email: "vothihuong@email.com",
            major_name: "Kế toán",
            status: "approved",
            phuong_thuc_xet_tuyen: "thi_thpt",
            khoi_thi: "D01",
            created_at: "2025-01-01T11:30:00Z"
        }
    ],
    top_majors: [
        { nganh_id: 1, ten_nganh: "Công nghệ Thông tin", application_count: 345 },
        { nganh_id: 2, ten_nganh: "Kinh tế", application_count: 287 },
        { nganh_id: 3, ten_nganh: "Quản trị Kinh doanh", application_count: 234 },
        { nganh_id: 4, ten_nganh: "Kế toán", application_count: 198 },
        { nganh_id: 5, ten_nganh: "Thiết kế Đồ họa", application_count: 156 }
    ]
};

export const DEMO_APPLICATIONS = [{
        id: 1,
        application_code: "HS2025001",
        ho_ten: "Nguyễn Văn An",
        ngay_sinh: "2005-03-15",
        cccd: "123456789012",
        email: "nguyenvanan@email.com",
        sdt: "0901234567",
        truong_thpt: "THPT Nguyễn Du",
        major_name: "Công nghệ Thông tin",
        status: "pending",
        phuong_thuc_xet_tuyen: "hoc_ba",
        gpa: 8.5,
        created_at: "2025-01-02T10:30:00Z"
    },
    {
        id: 2,
        application_code: "HS2025002",
        ho_ten: "Trần Thị Bình",
        ngay_sinh: "2005-07-22",
        cccd: "123456789013",
        email: "tranthibinh@email.com",
        sdt: "0901234568",
        truong_thpt: "THPT Lê Quý Đôn",
        major_name: "Kinh tế",
        status: "approved",
        phuong_thuc_xet_tuyen: "thi_thpt",
        khoi_thi: "A00",
        gpa: 7.8,
        created_at: "2025-01-02T09:15:00Z"
    },
    {
        id: 3,
        application_code: "HS2025003",
        ho_ten: "Lê Minh Châu",
        ngay_sinh: "2005-11-08",
        cccd: "123456789014",
        email: "leminhchau@email.com",
        sdt: "0901234569",
        truong_thpt: "THPT Trần Hưng Đạo",
        major_name: "Thiết kế Đồ họa",
        status: "rejected",
        phuong_thuc_xet_tuyen: "danh_gia_nang_luc",
        diem_danh_gia_nang_luc: 650,
        gpa: 6.5,
        created_at: "2025-01-01T16:45:00Z"
    },
    {
        id: 4,
        application_code: "HS2025004",
        ho_ten: "Phạm Quốc Duy",
        ngay_sinh: "2005-05-30",
        cccd: "123456789015",
        email: "phamquocduy@email.com",
        sdt: "0901234570",
        truong_thpt: "THPT Nguyễn Thái Học",
        major_name: "Quản trị Kinh doanh",
        status: "pending",
        phuong_thuc_xet_tuyen: "hoc_ba",
        gpa: 7.2,
        created_at: "2025-01-01T14:20:00Z"
    },
    {
        id: 5,
        application_code: "HS2025005",
        ho_ten: "Võ Thị Hương",
        ngay_sinh: "2005-09-12",
        cccd: "123456789016",
        email: "vothihuong@email.com",
        sdt: "0901234571",
        truong_thpt: "THPT Lê Hồng Phong",
        major_name: "Kế toán",
        status: "approved",
        phuong_thuc_xet_tuyen: "thi_thpt",
        khoi_thi: "D01",
        gpa: 8.1,
        created_at: "2025-01-01T11:30:00Z"
    },
    {
        id: 6,
        application_code: "HS2025006",
        ho_ten: "Hoàng Minh Tuấn",
        ngay_sinh: "2005-02-18",
        cccd: "123456789017",
        email: "hoangminhtuan@email.com",
        sdt: "0901234572",
        truong_thpt: "THPT Võ Thị Sáu",
        major_name: "Cơ khí Ô tô",
        status: "pending",
        phuong_thuc_xet_tuyen: "thi_thpt",
        khoi_thi: "A00",
        gpa: 7.9,
        created_at: "2025-01-01T08:30:00Z"
    },
    {
        id: 7,
        application_code: "HS2025007",
        ho_ten: "Đặng Thùy Linh",
        ngay_sinh: "2005-06-25",
        cccd: "123456789018",
        email: "dangthuylinh@email.com",
        sdt: "0901234573",
        truong_thpt: "THPT Nguyễn Bỉnh Khiêm",
        major_name: "Ngôn ngữ Anh",
        status: "approved",
        phuong_thuc_xet_tuyen: "hoc_ba",
        gpa: 8.8,
        created_at: "2024-12-31T15:45:00Z"
    },
    {
        id: 8,
        application_code: "HS2025008",
        ho_ten: "Bùi Văn Hải",
        ngay_sinh: "2005-10-03",
        cccd: "123456789019",
        email: "buivanhai@email.com",
        sdt: "0901234574",
        truong_thpt: "THPT Trưng Vương",
        major_name: "Điện tử Viễn thông",
        status: "rejected",
        phuong_thuc_xet_tuyen: "danh_gia_nang_luc",
        diem_danh_gia_nang_luc: 580,
        gpa: 6.2,
        created_at: "2024-12-31T13:20:00Z"
    }
];

export const DEMO_FAQS = [{
        id: 1,
        question: "Điều kiện xét tuyển vào HUTECH là gì?",
        answer: "Thí sinh cần tốt nghiệp THPT hoặc tương đương, có kết quả học tập từ lớp 10 đến lớp 12 hoặc điểm thi THPT.",
        category: "Điều kiện xét tuyển",
        is_active: true,
        view_count: 1250,
        created_at: "2024-12-01T10:00:00Z"
    },
    {
        id: 2,
        question: "Có những phương thức xét tuyển nào?",
        answer: "HUTECH có 3 phương thức chính: Xét học bạ THPT, Xét điểm thi THPT, và Xét kết quả đánh giá năng lực.",
        category: "Phương thức xét tuyển",
        is_active: true,
        view_count: 980,
        created_at: "2024-12-01T10:30:00Z"
    },
    {
        id: 3,
        question: "Học phí tại HUTECH như thế nào?",
        answer: "Học phí dao động từ 18-25 triệu/năm tùy theo ngành học. Sinh viên có thể đăng ký học bổng để giảm học phí.",
        category: "Học phí",
        is_active: true,
        view_count: 756,
        created_at: "2024-12-01T11:00:00Z"
    },
    {
        id: 4,
        question: "Thời gian đào tạo là bao lâu?",
        answer: "Hầu hết các ngành đào tạo trong 4 năm. Một số ngành đặc biệt có thể kéo dài 4.5-5 năm.",
        category: "Đào tạo",
        is_active: true,
        view_count: 432,
        created_at: "2024-12-01T11:30:00Z"
    },
    {
        id: 5,
        question: "Có hỗ trợ ký túc xá không?",
        answer: "HUTECH có ký túc xá với đầy đủ tiện nghi, giá cả phải chăng. Sinh viên có thể đăng ký từ đầu khóa học.",
        category: "Ký túc xá",
        is_active: true,
        view_count: 324,
        created_at: "2024-12-01T12:00:00Z"
    }
];

export const DEMO_MAJORS = [
    { id: 1, ten_nganh: "Công nghệ Thông tin", ma_nganh: "CNTT" },
    { id: 2, ten_nganh: "Kinh tế", ma_nganh: "KT" },
    { id: 3, ten_nganh: "Quản trị Kinh doanh", ma_nganh: "QTKD" },
    { id: 4, ten_nganh: "Kế toán", ma_nganh: "KeToan" },
    { id: 5, ten_nganh: "Thiết kế Đồ họa", ma_nganh: "TKDH" },
    { id: 6, ten_nganh: "Cơ khí Ô tô", ma_nganh: "CKOT" },
    { id: 7, ten_nganh: "Ngôn ngữ Anh", ma_nganh: "NNA" },
    { id: 8, ten_nganh: "Điện tử Viễn thông", ma_nganh: "DTVT" }
];