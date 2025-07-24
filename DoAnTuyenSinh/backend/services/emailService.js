import nodemailer from 'nodemailer';

// Cấu hình email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Hoặc service khác tùy chọn
    auth: {
        user: process.env.EMAIL_USER || 'khoa0372243036@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'rexkbshgxwzqaxmw'
    }
});

// Template email đăng ký tài khoản thành công
export const sendWelcomeEmail = async(userEmail, fullName, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Chào mừng đến với Hệ thống Tuyển sinh HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">🎓 HUTECH</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh Đại học</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Chào mừng bạn đến với HUTECH!</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Xin chào <strong>${fullName}</strong>,
                    </p>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Cảm ơn bạn đã đăng ký tài khoản tại Hệ thống Tuyển sinh HUTECH. Tài khoản của bạn đã được tạo thành công!
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin tài khoản:</h3>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
                        <p style="margin: 5px 0;"><strong>Tên đăng nhập:</strong> ${username}</p>
                    </div>
                    
                    <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">🚀 Các bước tiếp theo:</h3>
                        <ol style="color: #555; line-height: 1.8;">
                            <li>Đăng nhập vào hệ thống</li>
                            <li>Hoàn thiện thông tin cá nhân</li>
                            <li>Nộp hồ sơ xét tuyển</li>
                            <li>Theo dõi trạng thái hồ sơ</li>
                        </ol>
                    </div>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
                    </p>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                            Truy cập hệ thống
                        </a>
                    </div>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};

// Template email quên mật khẩu
export const sendPasswordResetEmail = async(userEmail, resetToken, fullName) => {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Đặt lại mật khẩu - Hệ thống Tuyển sinh HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">🔐 Đặt lại mật khẩu</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                    </p>
                    
                    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                        <p style="color: #856404; margin: 0; font-weight: bold;">⚠️ Lưu ý quan trọng:</p>
                        <p style="color: #856404; margin: 5px 0;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-size: 16px; font-weight: bold;">
                            Đặt lại mật khẩu
                        </a>
                    </div>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Link này sẽ hết hạn sau 1 giờ. Nếu link không hoạt động, bạn có thể copy và paste vào trình duyệt:
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 12px; color: #666;">
                        ${resetLink}
                    </div>
                    
                    <p style="color: #555; line-height: 1.6; margin-top: 20px;">
                        Nếu bạn gặp vấn đề, vui lòng liên hệ hỗ trợ: <strong>tuyensinh@hutech.edu.vn</strong>
                    </p>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};

// Template email nộp hồ sơ xét tuyển thành công
export const sendApplicationSubmittedEmail = async(userEmail, fullName, applicationData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Xác nhận nộp hồ sơ xét tuyển - HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">✅ Hồ sơ đã được nộp thành công</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Chúng tôi xác nhận đã nhận được hồ sơ xét tuyển của bạn. Cảm ơn bạn đã chọn HUTECH!
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin hồ sơ:</h3>
                        <p style="margin: 5px 0;"><strong>Mã hồ sơ:</strong> ${applicationData.id || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngành đăng ký:</strong> ${applicationData.major_name || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Phương thức xét tuyển:</strong> ${applicationData.admission_method || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngày nộp:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📊 Các bước tiếp theo:</h3>
                        <ol style="color: #555; line-height: 1.8;">
                            <li>Hồ sơ sẽ được xem xét trong vòng 3-5 ngày làm việc</li>
                            <li>Bạn sẽ nhận được email thông báo kết quả</li>
                            <li>Có thể tra cứu trạng thái hồ sơ tại hệ thống</li>
                            <li>Liên hệ hỗ trợ nếu cần thêm thông tin</li>
                        </ol>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/tra-cuu-ket-qua" 
                           style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                            Tra cứu kết quả
                        </a>
                    </div>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Application submitted email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending application submitted email:', error);
        return false;
    }
};

// Template email thay đổi trạng thái hồ sơ
export const sendApplicationStatusUpdateEmail = async(userEmail, fullName, applicationData, newStatus, reason = '') => {
        const statusText = {
            'pending': 'Chờ xét duyệt',
            'approved': 'Đã duyệt',
            'rejected': 'Từ chối',
            'incomplete': 'Thiếu thông tin'
        };

        const statusColor = {
            'pending': '#ffc107',
            'approved': '#28a745',
            'rejected': '#dc3545',
            'incomplete': '#17a2b8'
        };

        const mailOptions = {
                from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
                to: userEmail,
                subject: `Cập nhật trạng thái hồ sơ - ${statusText[newStatus]} - HUTECH`,
                html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, ${statusColor[newStatus]} 0%, ${statusColor[newStatus]}dd 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">📋 Cập nhật trạng thái hồ sơ</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Hồ sơ xét tuyển của bạn đã được cập nhật trạng thái mới.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${statusColor[newStatus]}; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin hồ sơ:</h3>
                        <p style="margin: 5px 0;"><strong>Mã hồ sơ:</strong> ${applicationData.id || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngành đăng ký:</strong> ${applicationData.major_name || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Trạng thái mới:</strong> <span style="color: ${statusColor[newStatus]}; font-weight: bold;">${statusText[newStatus]}</span></p>
                        <p style="margin: 5px 0;"><strong>Ngày cập nhật:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
                        ${reason ? `<p style="margin: 5px 0;"><strong>Lý do:</strong> ${reason}</p>` : ''}
                    </div>
                    
                    ${newStatus === 'rejected' ? `
                        <div style="background: #f8d7da; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 20px 0;">
                            <h3 style="color: #721c24; margin-top: 0;">❌ Hồ sơ bị từ chối</h3>
                            <p style="color: #721c24; line-height: 1.6;">
                                Hồ sơ của bạn không đáp ứng yêu cầu xét tuyển. Vui lòng liên hệ với chúng tôi để được hỗ trợ.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${newStatus === 'incomplete' ? `
                        <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; border-left: 4px solid #17a2b8; margin: 20px 0;">
                            <h3 style="color: #0c5460; margin-top: 0;">⚠️ Hồ sơ thiếu thông tin</h3>
                            <p style="color: #0c5460; line-height: 1.6;">
                                Vui lòng bổ sung thông tin còn thiếu để hoàn thiện hồ sơ.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${newStatus === 'approved' ? `
                        <div style="background: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
                            <h3 style="color: #155724; margin-top: 0;">✅ Hồ sơ đã được duyệt</h3>
                            <p style="color: #155724; line-height: 1.6;">
                                Chúc mừng! Hồ sơ của bạn đã được chấp nhận. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                            </p>
                        </div>
                    ` : ''}
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/tra-cuu-ket-qua" 
                           style="background: linear-gradient(135deg, ${statusColor[newStatus]} 0%, ${statusColor[newStatus]}dd 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                            Xem chi tiết
                        </a>
                    </div>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Application status update email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending application status update email:', error);
        return false;
    }
};

// Template email đăng ký tư vấn thành công
export const sendConsultationRequestEmail = async (userEmail, fullName, consultationData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Xác nhận đăng ký tư vấn - HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">📞 Đăng ký tư vấn thành công</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Cảm ơn bạn đã đăng ký tư vấn tại HUTECH. Chúng tôi đã nhận được yêu cầu của bạn.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #17a2b8; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin tư vấn:</h3>
                        <p style="margin: 5px 0;"><strong>Họ tên:</strong> ${consultationData.full_name || fullName}</p>
                        <p style="margin: 5px 0;"><strong>Số điện thoại:</strong> ${consultationData.phone || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngành quan tâm:</strong> ${consultationData.major_interest || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Thời gian tư vấn:</strong> ${consultationData.preferred_time || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngày đăng ký:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    
                    <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">⏰ Thời gian phản hồi:</h3>
                        <p style="color: #555; line-height: 1.6;">
                            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ làm việc để sắp xếp lịch tư vấn chi tiết.
                        </p>
                    </div>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Nếu bạn cần hỗ trợ gấp, vui lòng liên hệ hotline: <strong>1900 633 390</strong>
                    </p>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Consultation request email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending consultation request email:', error);
        return false;
    }
};

// Template email đăng ký học bổng thành công
export const sendScholarshipApplicationEmail = async (userEmail, fullName, scholarshipData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Xác nhận đăng ký học bổng - HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">🏆 Đăng ký học bổng thành công</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Cảm ơn bạn đã đăng ký học bổng tại HUTECH. Chúng tôi đã nhận được đơn đăng ký của bạn.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin đăng ký học bổng:</h3>
                        <p style="margin: 5px 0;"><strong>Họ tên:</strong> ${scholarshipData.full_name || fullName}</p>
                        <p style="margin: 5px 0;"><strong>Loại học bổng:</strong> ${scholarshipData.scholarship_type || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngành đăng ký:</strong> ${scholarshipData.major || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Điểm trung bình:</strong> ${scholarshipData.gpa || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Ngày đăng ký:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #856404; margin-top: 0;">📊 Quy trình xét duyệt:</h3>
                        <ol style="color: #856404; line-height: 1.8;">
                            <li>Kiểm tra tính hợp lệ của hồ sơ (3-5 ngày)</li>
                            <li>Xét duyệt học bổng (7-10 ngày)</li>
                            <li>Thông báo kết quả qua email</li>
                            <li>Phỏng vấn (nếu cần)</li>
                        </ol>
                    </div>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Chúng tôi sẽ thông báo kết quả sớm nhất có thể. Chúc bạn may mắn!
                    </p>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Scholarship application email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending scholarship application email:', error);
        return false;
    }
};

// Template email thay đổi thông tin cá nhân
export const sendProfileUpdateEmail = async (userEmail, fullName, updateType, clientIP = 'N/A') => {
    const updateText = {
        'email': 'email',
        'password': 'mật khẩu',
        'avatar': 'ảnh đại diện',
        'profile': 'thông tin cá nhân'
    };

    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@hutech.edu.vn',
        to: userEmail,
        subject: 'Cập nhật thông tin tài khoản - HUTECH',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">⚙️ Cập nhật tài khoản</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Hệ thống Tuyển sinh HUTECH</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin-bottom: 20px;">Xin chào ${fullName},</h2>
                    
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Chúng tôi xác nhận rằng ${updateText[updateType]} của bạn đã được cập nhật thành công.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6c757d; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Thông tin cập nhật:</h3>
                        <p style="margin: 5px 0;"><strong>Loại cập nhật:</strong> ${updateText[updateType]}</p>
                        <p style="margin: 5px 0;"><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
                        <p style="margin: 5px 0;"><strong>IP thực hiện:</strong> ${clientIP}</p>
                    </div>
                    
                    <div style="background: #f8d7da; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 20px 0;">
                        <h3 style="color: #721c24; margin-top: 0;">🔒 Bảo mật tài khoản:</h3>
                        <p style="color: #721c24; line-height: 1.6;">
                            Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ ngay với chúng tôi để được hỗ trợ bảo mật tài khoản.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" 
                           style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                            Xem tài khoản
                        </a>
                    </div>
                </div>
                
                <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">© 2024 HUTECH - Hệ thống Tuyển sinh Đại học</p>
                    <p style="margin: 5px 0;">Email: tuyensinh@hutech.edu.vn | Hotline: 1900 633 390</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Profile update email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending profile update email:', error);
        return false;
    }
};

// Hàm kiểm tra kết nối email
export const testEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('Email server connection verified successfully');
        return true;
    } catch (error) {
        console.error('Email server connection failed:', error);
        return false;
    }
};

export default {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendApplicationSubmittedEmail,
    sendApplicationStatusUpdateEmail,
    sendConsultationRequestEmail,
    sendScholarshipApplicationEmail,
    sendProfileUpdateEmail,
    testEmailConnection
};