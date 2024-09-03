import slugify from "slugify";
import Product from "../models/product.js";

const createSlug = (text) => {
return slugify(text, {
    lower: true,      // Mengubah slug menjadi huruf kecil
    strict: true      // Menghilangkan karakter yang tidak diizinkan dalam URL
});
};

export const allProduct = async (req) => {
    const queryObj = {...req.query}
    const excludeField = ["page", "limit", "search"]

    excludeField.forEach((el) => delete queryObj[el])
    
    let query;
    if (req.query.search) {
        query = Product.find({
            name: {$regex: req.query.search, $options: 'i'}
        })
    }else{
        query = Product.find(queryObj)
    }

    const page = parseInt(req.query.page) || 1
    const limitData = parseInt(req.query.limit) || 1
    const skipData = (page - 1) * limitData
    
    query = query.skip(skipData).limit(limitData)

    const countProduct = await Product.countDocuments()
    if (req.query.page) {
        
        if (skipData >= countProduct) {
            return {
                statusCode: 404,
                message: 'Page ini tidak ada',
            };
        }
    }
    const dataProduct = await query
     
    return {
        statusCode: 200,
        message: 'Berhasil mngambil semua produk',
        countData: countProduct,
        data: dataProduct
    };
}

export const createProduct = async (req) => {
    req.body.slug = createSlug(req.body.name)
    const dataProduct =  await Product.create(req.body)

    return {
        statusCode: 201,
        message: 'Berhasil menambahkan produk',
        data: dataProduct
    };
}

export const detailProduct = async (req) => {
    const dataProduct = await Product.findOne({ slug: req.params.slug })
    if (!dataProduct) {
        return {
            statusCode: 404,
            message: 'Produk tidak ditemukan',
        };
    }
    return {
        statusCode: 200,
        message: 'Berhasil mendapatkan detail produk',
        data: dataProduct
    };
}

export const updateProduct = async (req) => {
    const checkProduct = await Product.findOne({ slug: req.params.slug })
    if (!checkProduct) {
        return {
            statusCode: 404,
            message: 'Produk tidak ditemukan',
        };
    }

    if (req.body.name) {
        req.body.slug = createSlug(req.body.name)
    }
    const dataProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        runValidators : false,
        new:true
    })
    return {
        statusCode: 201,
        message: 'Berhasil memperbarui produk',
        data: dataProduct
    };
}

export const deleteProduct = async (req) => {
    const checkProduct = await Product.findOne({ slug: req.params.slug })
    if (!checkProduct) {
        return {
            statusCode: 404,
            message: 'Produk tidak ditemukan',
        };
    }

    await Product.findOneAndDelete({ slug: req.params.slug })
    
    return {
        statusCode: 200,
        message: 'Berhasil menghapus produk',
    };
}

export const fileUpload = async (req) => {
    const file = req.file
    if (!file) {
        return {
            statusCode: 400,
            message: 'Tidak ada file yang diiput',
        };
    }

    const imageFileName = file.filename
    const pathImageFile = `/uploads/${imageFileName}`
    return {
        statusCode: 200,
        message: 'Image berhasil di upload',
        data: pathImageFile
    };
}