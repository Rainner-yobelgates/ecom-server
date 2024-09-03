import Product from '../models/product.js'
import Order from '../models/order.js'

export const allOrder = async (req) => {
    const orders = await Order.find()

    return {
        statusCode: 200,
        message: 'Berhasil mengambil semua pesanan',
        data: orders
    };
}

export const createOrder = async (req) => {
    const {email, firstName, lastName, phone, cartItem} = req.body

    if (!cartItem || cartItem.length < 1) {
        return {
            statusCode: 400,
            message: 'Keranjang masih kosong',
        };
    }

    let orderItem = [] 
    let total = 0

    for(const cart of cartItem) {
        const productData = await Product.findOne({_id: cart.productId})
        if (!productData) {
            return {
                statusCode: 404,
                message: 'Product tidak ditemukan',
            };
        }

        const {name, price, _id} = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            productId: _id 
        }
        orderItem = [...orderItem, singleProduct]
        total += cart.quantity * price
    }

    const order = await Order.create({
        firstName,
        lastName,
        email,
        phone,
        total,
        itemsDetail: orderItem,
        userId: req.user.id
    })

    return {
        statusCode: 201,
        message: 'Berhasil membuat pesanan',
        data: order,
        total
    };
}

export const detailOrder = async (req) => {
    const order = await Order.findById(req.params.id)

    return {
        statusCode: 200,
        message: 'Berhasil mengambil detail pesanan',
        data: order
    };
}

export const userOrder = async (req) => {
    const orders = await Order.find({'userId': req.user.id})

    return {
        statusCode: 200,
        message: 'Berhasil mengambil pesanan dari user',
        data: orders
    };
}
