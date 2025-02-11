const {authSchema} = require("../validators/auth.validator");
const UserServices = require("../services/user.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        try {
            const {error} = authSchema.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const {username, password} = req.body;
            const user = await UserServices.getUserByUsername(username);
            if (!user) {
                res.status(400).json({message: 'Kullanıcı bulunamadı.'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Şifre yanlış.'});
            }

            const SECRET_KEY = process.env.SECRET_KEY;
            const token = jwt.sign({
                username: user.username, isAdmin: user.isAdmin
            }, SECRET_KEY);
            res.json({token, message: 'Giriş Başarılı.'});

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token', {httpOnly: true, secure: true});
            res.json({message: 'Çıkış Başarılı.'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async createAdmin(req, res) {
        try {
            const admin = {
                username: 'admin2',
                password: 'admin123',
            }
            await UserServices.createUser(admin, 1);
            res.json({message: 'Admin oluşturuldu.'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new AuthController();
