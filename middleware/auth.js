import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const protectedMiddleware = async(req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Not Authorized, no token",
            });
        }
    }else{
        res.status(401).json({
            success: false,
            message: "Not Authorized, no token",
        });
    }
}

export const ownerMiddleware = (req, res, next) => {
    console.log(req, req.user);
    
    if (req.user && req.user.role === 'owner') {
        next()
    }else{
        res.status(401).json({
            success: false,
            message: "Not Authorized as Owner",
        });
    }
}