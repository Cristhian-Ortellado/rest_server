const {response, request} = require('express');
const {Category } = require('../models')

const getCategories = async (req = request, res= response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
  
    //get categories
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).skip(Number(from)).limit(Number(limit)).populate('user'),
    ]);
  
    res.json({
      total,
      categories,
    });
}

const getCategory = async(req= request, res= response) =>{
    const {id} = req.params;

    const category = await Category.findById( id).where({state:true}).populate('user');

    if(!category){
        return res.status(404).json({
            msg:`Category not found`
        })
    }

    return res.status(200).json({
        category
    });
}

const createCategory = async(req= request, res=response) =>{
    const name = req.body.name.toUpperCase();
    const categoryDB =  await Category.findOne({name});
    
    if(categoryDB){
        return res.status(400).json({
            msg: `Category ${categoryDB.name} already exists`
        });
    }

    const data = {
        name,
        user:req.user._id
    }

    const category = new Category(data);

    //save db 
    await category.save();
    return res.status(201).json({
        category
    });
}


const updateCategory = async(req= request, res= response) =>{
    const {id} = req.params;
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(id,{name:name});

    return res.status(200).json({
        category
    });
}

const deleteCategory = async(req= request, res= response) =>{
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id,{state:false});

    return res.status(200).json({
        category
    });
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}