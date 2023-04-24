const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../model/User')
require('dotenv').config()

exports.register = async (req, res) => {
    const saltRounds = 10;
    const { username, email, password } = req.body
    try {
        switch(true) {
            case (!username || username === ""):
                return res.status(400).json({ErrorMessage: "กรุณาป้อน username"})
                break;
            case (!email || email === ""):
                return res.status(400).json({ErrorMessage: "กรุณาป้อน email"})
                break;
            case (!password):
                return res.status(400).json({ErrorMessage: "กรุณาป้อน password"})
                break;
        }

        const user = await User.findOne({"$or":[
            {'username': username},
            {'email': email}
        ]})

        if(user) {
            return res.status(400).json({ErrorMessage: "อีเมลหรือชื่อผู้ใช้ถูกใช้งานแล้ว"})
        }

        const hash = await bcrypt.hash(password, saltRounds)
        User.create({
            username: username,
            email: email.toLowerCase(),
            password: hash
        }).then((result) => {
            return res.status(200).json({SuccessMessage: "สมัครสมาชิกเสร็จสิ้น"})
        }).catch((err) => {
            console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    switch(true) {
        case (!username || username === ""):
            return res.status(400).json({ErrorMessage: "กรุณาป้อนชื่อผู้ใช้ในการเข้าสู่ระบบ"})
            break;
        case (!password || password === ""):
            return res.status(400).json({ErrorMessage: "กรุณาป้อนรหัสผ่านเพื่อเข้าสู่ระบบ"})
            break;
    }

    const user = await User.findOne({'username': username})
    if (!user) {
        return res.status(400).json({ErrorMessage: "ไม่พบผู้ใช้งานในระบบ"})
    }
    const result = await bcrypt.compare(password, user.password)

    if(result) {
        const token = jwt.sign({
            email: user.email,
            username: user.username
        }, process.env.TOKEN_SECRET,
        {expiresIn: '1d'})
        res.setHeader('token', token)
        res.setHeader('Set-Cookie', "token=" + token)
        return res.status(200).json({
            username: user.username,
            email: user.email,
            token: token
        })
    } else {
        return res.status(400).json({ErrorMessage: `รหัสผ่านไม่ถูกต้อง`})
    }
}