const {response, request} = require('express');
const {Product } = require('../models')

const getProducts = async (req = request, res= response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
  
    //get products
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip(Number(from)).limit(Number(limit)).populate(['user','category']),
    ]);
  
    res.json({
      total,
      products,
    });
}

const getProduct = async(req= request, res= response) =>{
    const {id} = req.params;
    const product = await Product.findById( id).where({state:true}).populate(['user','category']);
    console.log(product);

    if(!product){
        return res.status(404).json({
            msg:`product not found`
        })
    }

    return res.status(200).json({
        product
    });
}

const createProduct = async(req= request, res=response) =>{
    const {name,price,categoryID,description,available} = req.body;
    const productDB =  await Product.findOne({name});
    
    //name product should be unique
    if(productDB){
        return res.status(400).json({
            msg: `Product ${productDB.name} already exists`
        });
    }

    const data = {
        name,
        price,
        description,
        available,
        category:categoryID,
        user:req.user._id
    }

    const product = new Product(data);

    //save db 
    await product.save();

    return res.status(201).json({
        product
    });
}


const updateProduct = async(req= request, res= response) =>{
    const {id} = req.params;
    const {name,price,categoryID,description,available} = req.body;

    
    const product = await Product.findByIdAndUpdate(id,{name,price,category:categoryID,description,available});

    return res.status(200).json({
        product
    });
}

const deleteProduct = async(req= request, res= response) =>{
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{state:false});

    return res.status(200).json({
        product
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}