const express = require('express');
const routesCart = express.Router();

let { foodCarts, dailyCarts,} = require('../../data/data');
const {writebackup} = require('../method');


routesCart.get('/' , (req, res) => {
    switch(req.query.array){
        case "food":
            res.status(200).json(foodCarts);
            break;

        case "daily":
            res.status(200).json(dailyCarts);
    }
})

routesCart.post('/', (req, res) => {
    const newData  = req.body;
    switch(req.query.array){
        case "food":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }

            foodCarts.push(newData)
            writebackup("foodCarts.json", foodCarts);
            res.status(200).send({success: true, data:foodCarts});
            // console.log(foods)
            break;
            
        case "daily":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            dailyCarts.push(newData)
            writebackup("dailyCarts.json", dailyCarts);
            res.status(200).send({success: true, data:dailyCarts});

    }
})

routesCart.delete('/',(req,res) => {
    if(!req.body.name)
            return res.status(404).json({success: false, message: "Missing info"});
    switch(req.query.array){
        case "food":
            const food = foodCarts.find((food) => food.id === req.body.id);
            if(!food)
                return res.status(404).json({success: false, message: "Food not found"});
            else{
                const newFoodCarts = foodCarts.filter((food) => food.id !== req.body.id);
                writebackup("foodCarts.json", newFoodCarts);
                res.status(200).json({success: true, data: newFoodCarts});
            }
            break;

        case "daily":
            const daily = dailyCarts.find((daily) => daily.id === req.body.id);
            if(!daily)
                return res.status(404).json({success: false, message: "Daily not found"});
            else{
                const newDailyCarts = dailyCarts.filter((daily) => daily.id !== req.body.id);
                writebackup("dailyCarts.json", newDailyCarts);
                res.status(200).json({success: true, data: newDailyCarts});
            }
    }
})

module.exports = routesCart;
           
