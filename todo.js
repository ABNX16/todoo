
const router =require('express').Router()
const tododModel= require('../models/todoitems')

//post
router.post('/item',async(req,res)=>{

    try{
        const todo=req.body.items
        const newTodo=new tododModel({items:todo})
        await newTodo.save()
        console.log(newTodo)
        res.status(200).json({data:newTodo})
    } catch(err) {
        console.log(err)
        res.status(404)
    }
})

//get
router.get('/items',async(req,res)=>{
    try{
        const allTdoitems= await tododModel.find({})
        res.status(200).json({data:allTdoitems})


    } catch(err){
        console.log(err)
        res.status(404)
    }
})

//update

router.put('/item/:id',async(req,res)=>{
    try{
       
        const updatedTodo=await tododModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json(updatedTodo)
        

    } catch(err){
        res.status(404).json

    }
})

//del
router.delete('/item/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const deleteTodo=await tododModel.findByIdAndDelete({_id:id})
        res.status(200).json({data:deleteTodo})
        

    } catch(err){
        res.status(404).json

    }
})
module.exports =router