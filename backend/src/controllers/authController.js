import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with role and department
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                role: true,
                department: true
            }
        });

        // Error if user is not found
        if (!user) {
            // General error message for security reasons
            return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Error if password is wrong
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email },  // Payload
            process.env.JWT_SECRET,                  // Secret
            { expiresIn: '1h' }                      // Expires in 1 hour
        );

        // Send token back to user
        res.json({
            message: 'Giriş başarılı!',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                department: user.department,
                requiresPasswordChange: user.requiresPasswordChange
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Giriş yapılırken bir sunucu hatası oluştu.' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        // Error if user is not found
        if (!user) {
            return res.status(404).json({ error: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Şifreniz başarıyla güncellendi.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Şifre güncellenirken bir hata oluştu.' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mevcut şifre yanlış.' });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password and set requiresPasswordChange to false
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedNewPassword,
                requiresPasswordChange: false
            }
        });

        res.json({ message: 'Şifre başarıyla değiştirildi.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Şifre değiştirilirken bir hata oluştu.' });
    }
};
