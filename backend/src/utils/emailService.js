import nodemailer from 'nodemailer';

// Configure Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Generate HTML email template for password reset
 * @param {string} code - 6-digit reset code
 * @returns {string} HTML email content
 */
const generatePasswordResetEmail = (code) => {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Şifre Sıfırlama</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header with GTU Branding -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #003d82 0%, #0056b3 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                                Gebze Teknik Üniversitesi
                            </h1>
                            <p style="color: #e3f2fd; margin: 5px 0 0 0; font-size: 14px;">
                                Staj Takip Sistemi
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">
                                Şifre Sıfırlama Talebi
                            </h2>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 15px;">
                                Merhaba,
                            </p>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 15px;">
                                Hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki doğrulama kodunu kullanarak şifrenizi sıfırlayabilirsiniz:
                            </p>
                            
                            <!-- Code Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background-color: #f8f9fa; border: 2px dashed #0056b3; border-radius: 8px; padding: 20px; display: inline-block;">
                                            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: bold;">
                                                DOĞRULAMA KODU
                                            </p>
                                            <p style="margin: 0; font-size: 32px; font-weight: bold; color: #0056b3; letter-spacing: 5px; font-family: 'Courier New', monospace;">
                                                ${code}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                    <strong>⚠️ Önemli:</strong> Bu kod 15 dakika süreyle geçerlidir. Eğer bu talebi siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.
                                </p>
                            </div>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                                Saygılarımızla,<br>
                                <strong>GTÜ Staj Takip Sistemi</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayın.<br>
                                Gebze Teknik Üniversitesi - Staj Takip Sistemi<br>
                                © 2025 Tüm hakları saklıdır.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

/**
 * Send password reset email
 * @param {string} email - Recipient email address
 * @param {string} code - 6-digit reset code
 * @returns {Promise} Email send promise
 */
export const sendPasswordResetEmail = async (email, code) => {
    const htmlContent = generatePasswordResetEmail(code);
    
    const mailOptions = {
        from: {
            name: 'GTÜ Staj Takip Sistemi',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'ITS Şifre Sıfırlama Kodu',
        html: htmlContent,
        text: `Şifre sıfırlama kodunuz: ${code}\n\nBu kod 15 dakika süreyle geçerlidir.\n\nEğer bu talebi siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.`
    };

    return transporter.sendMail(mailOptions);
};

/**
 * Send welcome email to new user (for future use)
 * @param {string} email - Recipient email address
 * @param {string} name - User name
 * @param {string} username - Username
 * @param {string} temporaryPassword - Temporary password
 * @returns {Promise} Email send promise
 */
export const sendWelcomeEmail = async (email, name, username, temporaryPassword) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoş Geldiniz</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #003d82 0%, #0056b3 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                                Gebze Teknik Üniversitesi
                            </h1>
                            <p style="color: #e3f2fd; margin: 5px 0 0 0; font-size: 14px;">
                                Staj Takip Sistemi
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">
                                Hoş Geldiniz, ${name}!
                            </h2>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 15px;">
                                GTÜ Staj Takip Sistemi'ne hoş geldiniz. Hesabınız başarıyla oluşturulmuştur.
                            </p>
                            
                            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                                    <strong>Kullanıcı Adı:</strong> ${username}
                                </p>
                                <p style="margin: 0; color: #666666; font-size: 14px;">
                                    <strong>Geçici Şifre:</strong> ${temporaryPassword}
                                </p>
                            </div>
                            
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                    <strong>⚠️ Önemli:</strong> İlk girişinizde şifrenizi değiştirmeniz gerekmektedir.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2025 Gebze Teknik Üniversitesi - Staj Takip Sistemi
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();

    const mailOptions = {
        from: {
            name: 'GTÜ Staj Takip Sistemi',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'GTÜ Staj Takip Sistemi - Hesap Bilgileriniz',
        html: htmlContent,
        text: `Hoş Geldiniz, ${name}!\n\nGTÜ Staj Takip Sistemi'ne hoş geldiniz.\n\nKullanıcı Adı: ${username}\nGeçici Şifre: ${temporaryPassword}\n\nİlk girişinizde şifrenizi değiştirmeniz gerekmektedir.`
    };

    return transporter.sendMail(mailOptions);
};

export default {
    sendPasswordResetEmail,
    sendWelcomeEmail
};
