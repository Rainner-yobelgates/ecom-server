import User from "../models/user.js";
import jwt from "jsonwebtoken"

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '6d'
    })
} 

const createSendResToken = (user, statusCode, message) => {
    const token = signToken(user._id)

    const isDev = process.env.NODE_ENV === 'development' ? false : true

    const cookieOption = {
        expire: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, 
        security: isDev
    }
    user.password = undefined

    return {
        statusCode,
        token,
        cookieOption,
        data: user,
        message
    }
}

export const registerUser = async (req) => {
    const role = (await User.countDocuments()) === 0 ? 'owner' : 'user'
    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role
    })
    const message = "Berhasil membuat user baru"
    return createSendResToken(createUser, 201, message)
}

export const loginUser = async (req) => {
    if (!req.body.email || !req.body.password) {
        return {
            statusCode: 400,
            message: 'Email dan password wajib diisi',
        };
    }
    const user = await User.findOne({
        email: req.body.email
    })
    
    if (user) {
        const isPasswordMatch = await user.comparePassword(req.body.password);
        
        if (isPasswordMatch) {
            const message = "Berhasil login";
            return createSendResToken(user, 200, message);
        } else {
            return {
                statusCode: 400,
                message: 'Email atau password salah',
            };
        }
    }else{
        return {
            statusCode: 400,
            message: 'Email atau password salah',
        };
    }
} 

export const getUser = async(req) => {
    const user = await User.findById(req.user._id).select('-password')

    if (user) {
        return {
            statusCode: 200,
            data: user,
            message: 'Berhasil mendapatkan data user',
        };
    }else{
        return {
            statusCode: 404,
            message: 'User tidak ditemukan',
        };
    }
}
