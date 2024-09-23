import express from "express";
import { protectedMiddleware, ownerMiddleware } from "../middleware/auth.js";
import {createProduct, allProduct, detailProduct, updateProduct, deleteProduct, fileUpload} from '../controllers/product.js'
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const dataProduct = await allProduct(req)

        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})
router.post('/create', protectedMiddleware, ownerMiddleware, async (req, res) => {
    try {
        const dataProduct = await createProduct(req)

        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})
router.get('/detail/:slug', async (req, res) => {
    try {
        const dataProduct = await detailProduct(req)

        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})
router.put('/update/:slug', protectedMiddleware, ownerMiddleware, async (req, res) => {
    try {
        const dataProduct = await updateProduct(req)

        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})
router.delete('/delete/:slug', protectedMiddleware, ownerMiddleware, async (req, res) => {
    try {
        const dataProduct = await deleteProduct(req)

        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})
router.post('/file-upload', protectedMiddleware, ownerMiddleware, upload.single('image'), async (req, res) => {
    try {
        const dataProduct = await fileUpload(req)
        console.log(dataProduct);
        
        res.status(dataProduct.statusCode).json(dataProduct)
    } catch (error) {
        res.json(error)
    }
})

export default router