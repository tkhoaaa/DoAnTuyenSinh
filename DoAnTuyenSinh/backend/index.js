const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Thư mục lưu file
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // hoặc user bạn đã tạo
  password: "16012005@", // thay bằng mật khẩu thật
  database: "tuyensinh",
});

// Đảm bảo thư mục uploads tồn tại
const fs = require("fs");
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// API lấy danh sách ngành
app.get("/api/nganh", (req, res) => {
  db.query("SELECT * FROM nganh", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// API đăng ký tài khoản
app.post("/api/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email và password là bắt buộc" });
  }

  try {
    // Kiểm tra username/email đã tồn tại
    db.query(
      "SELECT username, email FROM users WHERE username = ? OR email = ?",
      [username, email],
      (err, results) => {
        if (err) {
          console.error("Lỗi kiểm tra user/email đã tồn tại:", err);
          return res
            .status(500)
            .json({ error: "Lỗi server khi kiểm tra tài khoản" });
        }
        if (results.length > 0) {
          let msg = "";
          if (results[0].username === username) msg += "Username đã tồn tại. ";
          if (results[0].email === email) msg += "Email đã tồn tại.";
          return res.status(400).json({ error: msg.trim() });
        }
        // Hash password và tạo user mới
        bcrypt.hash(password, 10, (hashErr, hash) => {
          if (hashErr) {
            console.error("Lỗi hash password:", hashErr);
            return res.status(500).json({ error: "Lỗi server khi đăng ký" });
          }
          db.query(
            "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
            [username, email, hash, role || "user"],
            (insertErr) => {
              if (insertErr) {
                console.error("Lỗi đăng ký user:", insertErr);
                return res
                  .status(500)
                  .json({ error: "Lỗi server khi đăng ký" });
              }
              res.json({ message: "Đăng ký thành công!" });
            }
          );
        });
      }
    );
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({ error: "Lỗi server khi đăng ký" });
  }
});

// API đăng nhập
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ error: "Tên đăng nhập/email và mật khẩu là bắt buộc" });
  }

  try {
    db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [identifier, identifier],
      (err, results) => {
        if (err) {
          console.error("Lỗi đăng nhập:", err);
          return res.status(500).json({ error: "Lỗi server khi đăng nhập" });
        }

        if (results.length === 0) {
          return res
            .status(401)
            .json({ error: "Sai tài khoản/email hoặc mật khẩu" });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (compareErr, match) => {
          if (compareErr) {
            console.error("Lỗi so sánh mật khẩu:", compareErr);
            return res.status(500).json({ error: "Lỗi server khi đăng nhập" });
          }

          if (!match) {
            return res
              .status(401)
              .json({ error: "Sai tài khoản/email hoặc mật khẩu" });
          }

          const token = jwt.sign(
            {
              id: user.id,
              role: user.role,
              username: user.username, // Thêm username vào token
            },
            "secret_key_change_this_in_production",
            { expiresIn: "1d" }
          );

          // Trả về thông tin đầy đủ
          res.json({
            token,
            role: user.role,
            username: user.username,
            message: "Đăng nhập thành công",
          });
        });
      }
    );
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
});

// Middleware xác thực token và phân quyền
function auth(requiredRole = "user") {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }

    jwt.verify(
      token,
      "secret_key_change_this_in_production",
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Token không hợp lệ" });
        }

        // Kiểm tra quyền truy cập
        if (requiredRole === "admin" && decoded.role !== "admin") {
          return res.status(403).json({ error: "Không đủ quyền truy cập" });
        }

        req.user = decoded;
        next();
      }
    );
  };
}

// API cho admin - xem tất cả hồ sơ
app.get("/api/admin/hoso", auth("admin"), async (req, res) => {
  try {
    db.query("SELECT * FROM hoso", (err, results) => {
      if (err) {
        console.error("Lỗi API admin/hoso:", err);
        return res.status(500).json({ error: "Lỗi server" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error("Lỗi API admin/hoso:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API lấy thông tin user hiện tại
app.get("/api/me", auth(), async (req, res) => {
  try {
    db.query(
      "SELECT id, username, role FROM users WHERE id = ?",
      [req.user.id],
      (err, results) => {
        if (err) {
          console.error("Lỗi API me:", err);
          return res.status(500).json({ error: "Lỗi server" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User không tìm thấy" });
        }

        res.json(results[0]);
      }
    );
  } catch (err) {
    console.error("Lỗi API me:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API tạo hồ sơ tuyển sinh
app.post("/api/hoso", upload.single("file_ho_so"), (req, res) => {
  const {
    ho_ten,
    ngay_sinh,
    cccd,
    sdt,
    email,
    noi_hoc_12,
    truong_thpt,
    ten_lop_12,
    dia_chi,
    nganh_id,
    diem_hk1,
    diem_ca_nam,
  } = req.body;
  const file_ho_so = req.file ? req.file.filename : null;

  db.query(
    `INSERT INTO hoso (ho_ten, ngay_sinh, cccd, sdt, email, noi_hoc_12, truong_thpt, ten_lop_12, dia_chi, nganh_id, diem_hk1, diem_ca_nam, file_ho_so)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ho_ten,
      ngay_sinh,
      cccd,
      sdt,
      email,
      noi_hoc_12,
      truong_thpt,
      ten_lop_12,
      dia_chi,
      nganh_id,
      diem_hk1,
      diem_ca_nam,
      file_ho_so,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Đăng ký thành công!" });
    }
  );
});

// Xử lý graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nĐang đóng kết nối database...");
  if (db) {
    db.end();
    console.log("✓ Đã đóng kết nối database");
  }
  process.exit(0);
});

// Khởi tạo database và start server
async function startServer() {
  db.connect((err) => {
    if (err) {
      console.error("Lỗi kết nối database:", err);
      process.exit(1);
    }
    console.log("✓ Kết nối database thành công!");

    // Test query để kiểm tra
    db.query("SELECT DATABASE() as DatabaseName", (err, results) => {
      if (err) {
        console.error("Lỗi test kết nối:", err);
      } else {
        console.log("✓ Đang sử dụng database:", results[0].DatabaseName);
      }
    });
  });

  app.listen(5000, () => {
    console.log("🚀 Backend chạy ở http://localhost:5000");
    console.log("📁 API endpoints:");
    console.log("   GET  /api/nganh");
    console.log("   POST /api/register");
    console.log("   POST /api/login");
    console.log("   GET  /api/me");
    console.log("   POST /api/hoso");
    console.log("   GET  /api/admin/hoso (admin only)");
  });
}

startServer().catch((err) => {
  console.error("Lỗi khởi động server:", err);
  process.exit(1);
});
