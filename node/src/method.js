let {foods, dailys, foodCarts, dailyCarts} = require('../data/data');

function checkDate(date){
    const currentDate = new Date();
    let expireDate = new Date();
    expireDate.setTime(new Date(date).getTime() + (1000 * 60 * 60 * 24*7));
    currentDate.toLocaleString('en-US', {timeZone:'America/Los_Angeles'});
    // console.log("currentDate", currentDate.getDate())
    // return true;
    console.log(currentDate);
    console.log(expireDate);
    if(expireDate <= currentDate)
        return true;
    return false;
}

function checkFoodNum(){
    foods.forEach(food => {
        if(food.num <= 1)
            foodCarts.push({"id":food.id,"name":food.name});
        
    });
   
}

function checkDailyNum(){
    dailys.forEach(daily => {
        if(daily.num <= 1)
            dailyCarts.push({"id":daily.id,"name":daily.name});
    });
}


module.exports = {checkDate, checkFoodNum, checkDailyNum};