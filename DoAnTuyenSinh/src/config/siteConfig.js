// Cấu hình website
export const SITE_CONFIG = {
    // Domain chính (thay thế bằng domain thật của bạn)
    domain: "https://do-an-tuyen-sinh-khoa.vercel.app", // Thay thế bằng domain thật

    // Thông tin cơ bản
    siteName: "HUTECHS - Đại học Công nghệ TP.HCM",
    siteDescription: "Thông tin tuyển sinh Đại học Công nghệ TP.HCM (HUTECHS). Đăng ký xét tuyển, tra cứu kết quả, thông tin ngành học và học bổng.",

    // Logo và favicon
    logo: "https://upload.wikimedia.org/wikipedia/vi/8/81/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.png", // Thay thế bằng URL logo thật
    favicon: "/favicon.ico",

    // Thông tin liên hệ
    contact: {
        address: "475A Điện Biên Phủ, Bình Thạnh, TP.HCM",
        phone: "+84-28-5445-7777",
        email: "tuyensinh@hutech.edu.vn"
    },

    // Social Media
    social: {
        facebook: "https://www.facebook.com/hutechsofficial",
        instagram: "https://www.instagram.com/hutechsofficial",
        tiktok: "https://www.tiktok.com/@hutechsofficial",
        youtube: "https://www.youtube.com/hutechsofficial"
    },

    // SEO mặc định
    defaultSEO: {
        keywords: "HUTECHS, tuyển sinh, đại học, công nghệ, TP.HCM, xét tuyển, học bổng",
        author: "HUTECHS",
        type: "website",
        locale: "vi_VN"
    }
};

// Helper functions
export const getFullUrl = (path = "") => {
    return `${SITE_CONFIG.domain}${path}`;
};

export const getSocialLinks = () => {
    return Object.values(SITE_CONFIG.social);
};