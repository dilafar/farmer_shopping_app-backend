const Product = require('../models/product');

const getAllProduct = async(req,res)=>{
    const {page} = req.query;
    try{
        const Limit = 6;
        const startIndex = (Number(page - 1)) * Limit;
        const total = await Product.countDocuments({});
        const product = await Product.find().sort({_id: -1}).limit(Limit).skip(startIndex);
        res.status(200).json({data: product, currentPage: Number(page), numberOfPages: Math.ceil(total/Limit)});
        
    }catch(err){
        res.status(404).json(err);
        console.log(err);
    }
    
   
};

const createProduct = async(req,res)=>{
    const {title ,desc, img,categories, price}= req.body;
    const userId = req.userId;
    const newProduct = new Product({
        userId, title ,desc, img,categories, price
    });
    try{
        const product = await newProduct.save();
        res.status(201).json(product);
    }catch(err){
        res.status(409).json(err);
    }
  
        
    
};

const updateProduct =  async(req,res)=>{
        const  userid = req.params.id;
        const{ title ,desc, img,categories, price}= req.body;
        const updateProduct = {
            title ,desc, img,categories, price
        }
        await Product.findByIdAndUpdate(userid,updateProduct).then(()=>{
            res.status(200).json(updateProduct);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })

};

const deleteProduct = async(req,res)=>{

    const id = req.params.id;
    await Product.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg:"Deletion successfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};


const getProductById = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = {getAllProduct , createProduct ,updateProduct ,deleteProduct ,getProductById};