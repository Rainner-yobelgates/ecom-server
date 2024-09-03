import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/auth.js";
import { protectedMiddleware } from "../middleware/auth.js";

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const dataUser = await registerUser(req)

        res.cookie('jwt', dataUser.token, dataUser.cookieOption)
        res.status(dataUser.statusCode).json(dataUser)
    } catch (error) {
        res.json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const dataUser = await loginUser(req)

        res.cookie('jwt', dataUser.token, dataUser.cookieOption)
        res.status(dataUser.statusCode).json(dataUser)
    } catch (error) {
        res.json(error)
    }
})

router.get('/logout', protectedMiddleware, async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({
        message: "Logout berhasil",
    })
})

router.get('/user', protectedMiddleware, async (req, res) => {
    try {
        const dataUser = await getUser(req)

        res.status(dataUser.statusCode).json(dataUser)
    } catch (error) {
        res.json(error)
    }
})

export default router