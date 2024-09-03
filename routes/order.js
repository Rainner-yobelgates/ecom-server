import express from "express";
import { protectedMiddleware, ownerMiddleware } from "../middleware/auth.js";
import { createOrder, allOrder, userOrder, detailOrder } from "../controllers/order.js";
const router = express.Router()

router.get('/', protectedMiddleware, ownerMiddleware, async (req, res) => {
    try {
        const dataOrder = await allOrder(req)

        res.status(dataOrder.statusCode).json(dataOrder)
    } catch (error) {
        res.json(error)
    }
})

router.post('/create', protectedMiddleware, async (req, res) => {
    try {
        const dataOrder = await createOrder(req)

        res.status(dataOrder.statusCode).json(dataOrder)
    } catch (error) {
        res.json(error)
    }
})

router.get('/detail/:id', protectedMiddleware, ownerMiddleware, async (req, res) => {
    try {
        const dataOrder = await detailOrder(req)

        res.status(dataOrder.statusCode).json(dataOrder)
    } catch (error) {
        res.json(error)
    }
})
router.get('/user', protectedMiddleware, async (req, res) => {
    try {
        const dataOrder = await userOrder(req)

        res.status(dataOrder.statusCode).json(dataOrder)
    } catch (error) {
        res.json(error)
    }
})

export default router