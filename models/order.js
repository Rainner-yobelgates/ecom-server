import mongoose from 'mongoose';
import validator from 'validator'

const { Schema } = mongoose;

const singleProduct = Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
})
const orderSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Nama depan harus diisi']
    },
    lastName: {
        type: String,
        required: [true, 'Nama depan harus diisi']
    },
    phone: {
        type: String,
        required: [true, 'Nomor telpon harus diisi']
    },
    email: {
        type: String,
        required: [true, "Email harus diisi"],
        validate: {
            validator: validator.isEmail,
            message: "Inputan harus berformat Email foo@gmail.com"
        }
    },
    total: {
        type: Number,
        required: [true, 'Total harga harus diisi']
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending",
    },
    itemsDetail: [singleProduct],
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
});

const Order = mongoose.model("Order", orderSchema)

export default Order