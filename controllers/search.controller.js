const {response, request} = require('express');
const { User, Product, Category, Role } = require('../models');
const { ObjectId } = require('mongoose').Types;

const searcheablesCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);

        res.json({
            results: user ?  [user]: []
        })
    }

    const regex = new RegExp(term, 'i')
    const users = await User.find({
        $or:[{name:regex},{email:regex}],
        $and:[{state:true}]
    });

    return res.json({
        results:users
    })

}

const searchProducts = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate('category','name');

        res.json({
            results: product ?  [product]: []
        })
    }

    const regex = new RegExp(term, 'i')
    const products = await Product.find({
        $or:[{name:regex}],
        $and:[{state:true}]
    }).populate('category','name');

    return res.json({
        results:products
    })

}


const searchCategories = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);

        res.json({
            results: category ?  [category]: []
        })
    }

    const regex = new RegExp(term, 'i')
    const categories = await Category.find({
        $or:[{name:regex}],
        $and:[{state:true}]
    });

    res.json({
        results:categories
    })

}

const searchRoles = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const role = await Role.findById(term);

        res.json({
            results: role ?  [role]: []
        })
    }

    const regex = new RegExp(term, 'i')
    const roles = await Role.find({
        $or:[{role:regex}]
    });

    res.json({
        results:roles
    })

}
const search = (req = request, res = response)=>{
    const {collection, term} = req.params;

    if (!searcheablesCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Please search by these collections ${searcheablesCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'products':
            searchProducts(term,res);
            break;
        case 'categories':
            searchCategories(term,res);
            break;
        case 'roles':
            searchRoles(term,res);
            break;
        default:
            return res.status(500).json({
                msg:'Something wrong happened'
            })
            
    }

}

module.exports = {
    search
}