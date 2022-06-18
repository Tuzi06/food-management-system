const express = require('express');
const routes = express.Router();

let {foods, dailys, foodCarts, dailyCarts} = require('../data/data');
const {checkDate, checkFoodNum, checkDailyNum} = require('./method');

routes.get('/', (req, res) => {
    switch(req.query.array){
        case "food":
            console.log("food")
            checkFoodNum();
            
            console.log(foodCarts);
            res.status(200).json(foods);
            break;
        case "daily":
            checkDailyNum();
            console.log(dailyCarts);
            res.status(200).json(dailys);
    }
})

routes.post('/', (req, res) => {
    const newData  = req.body;
    switch(req.query.array){
        case "food":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }

            let isAlmost =checkDate(req.body.date);
            console.log("the food is expire? ", isAlmost)
            newData["almost-expire"] = isAlmost? "food is almost or already expire": "food is safe for storage";
            foods.push(newData)
            res.status(200).send({success: true, data:foods});
            console.log(foods)
            break;
            
        case "daily":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            dailys.push(newData)
            res.status(200).send({success: true, data:dailys});

    }
})

routes.put('/',(req,res) => {
    switch(req.query.array){
        case "food":
            if(!req.body.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            const food = foods.find((food) => food.id === req.body.id);
            if(!food){
                return res.status(404).json({success: false, message: "Food not found"});
            }
            else{
                const newFoods = foods.map((food) => {
                    if(food.id === req.body.id){
                        return req.body;
                    }
                    return food;
                });
                res.status(200).json({success: true, data: newFoods});
            }

        case "daily":
             if(!req.body.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            const daily = dailys.find((daily) => daily.id === req.body.id);
            if(!daily){
                return res.status(404).json({success: false, message: "Daily not found"});
            }
            else{
                const newDailys = dailys.map((daily) => {
                    if(daily.id === req.body.id){
                        return req.body;
                    }
                    return daily;
                });
                res.status(200).json({success: true, data: newDailys});
            }
    }

})

routes.delete('/',(req,res) => {
    switch(req.query.array){
        case "food":
            if(!req.body.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            const food = foods.find((food) => food.id === req.body.id);
            if(!food){
                return res.status(404).json({success: false, message: "Food not found"});
            }
            else{
                const newFoods = foods.filter((food) => food.id !== req.body.id);
                res.status(200).json({success: true, data: newFoods});
            }

        case "daily":
             if(!req.body.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            const daily = dailys.find((daily) => daily.id === req.body.id);
            if(!daily){
                return res.status(404).json({success: false, message: "Daily not found"});
            }
            else{
                const newDailys = dailys.filter((daily) => daily.id !== req.body.id);
                res.status(200).json({success: true, data: newDailys});
            }
    }
})

module.exports = routes