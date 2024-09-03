import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nama produk harus diisi"],
        unique: [true, "Nama produk sudah digunakan, silahkan buat yang baru"]
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Harga harus diisi"],
    },
    description: {
        type: String,
        required: [true, "Deskripsi produk harus diisi"],
    },
    image: {
        type: String,
        default: null
    },
    category:{
        type: String,
        required: [true, "Kategori produk harus diisi"],
        enum: ["sepatu", "kemeja", "baju", "celana"]
    },
    stock: {
        type: Number, 
        default: 0
    }
});

const Product = mongoose.model("Product", productSchema)

export default Product