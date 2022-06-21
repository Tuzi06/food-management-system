const express = require('express');
const routes = express.Router();

let {foods, dailys, foodCarts, dailyCarts, foodWarnings} = require('../data/data');
const {checkDate, checkFoodNum, checkDailyNum,writebackup} = require('./method');

routes.get('/', (req, res) => {
    switch(req.query.array){
        case "food":
            console.log("food")
            checkFoodNum();
            
            console.log(foodCarts);
            writebackup("foodCarts.json", foodCarts);
            res.status(200).json(foods);
            break;

        case "daily":
            checkDailyNum();
            writebackup("dailyCarts.json", dailyCarts);
            res.status(200).json(dailys);
    }
})

routes.get('/carts' , (req, res) => {
    switch(req.query.array){
        case "food":
            res.status(200).json(foodCarts);
            break;

        case "daily":
            res.status(200).json(dailyCarts);
    }
})


routes.get('/foodwarnings', (req, res) => {
    // console.log(req)
    foods.forEach(food => {
        if(food['almost-expire'] !== "food is safe for storage"){
            foodWarnings.push({"id":food.id,"name":food.name,"place":food.place});
        }
    })
    writebackup("foodWarnings.json", foodWarnings);
    res.status(200).json(foodWarnings);
})

routes.post('/', (req, res) => {
    const newData  = req.body;
    switch(req.query.array){
        case "food":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }

            let isAlmost =checkDate(req.body.date);
            // console.log("the food is expire? ", isAlmost)
            newData["almost-expire"] = isAlmost? "food is almost or already expire": "food is safe for storage";
            foods.push(newData)
            writebackup("foods.json", foods);
            res.status(200).send({success: true, data:foods});
            // console.log(foods)
            break;
            
        case "daily":
            if(!newData.name){
                return res.status(400).json({success: false, message: "Missing info"});
            }
            dailys.push(newData)
            writebackup("dailys.json", dailys);
            res.status(200).send({success: true, data:dailys});

    }
})

routes.post('/carts', (req, res) => {
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
                    console.log("food \n", food)
                    console.log("req \n",req.body)
                    if(food.id === req.body.id){
                        food = req.body
                        let isAlmost =checkDate(req.body.date);
                        food["almost-expire"] = isAlmost? "food is almost or already expire": "food is safe for storage";
                        
                    }
                    return food;
                });
                console.log(newFoods);
                writebackup("foods.json", newFoods);
                res.status(200).json({success: true, data: newFoods});
            }
            break;

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
                writebackup("dailys.json", newDailys);
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
                writebackup("foods.json", newFoods);
                res.status(200).json({success: true, data: newFoods});
            }
            break;

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
                writebackup("dailys.json", newDailys);
                res.status(200).json({success: true, data: newDailys});
            }
    }
})


routes.delete('/carts',(req,res) => {
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
           

module.exports = routes