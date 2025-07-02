db.orders.aggregate(
    [
        {
            $lookup:{
                from:"users",
                localField:"user_id",
                foreignField:"_id",
                as:"name"
            }
        },
        {
            $unwind:"$name"
        },
        {
            $group:{
                _id:{
                    user_id:"$user_id",
                    user_name:"$name.first_name",
                },
                
                order:{$sum:1}
            }
            
        }
        
    ]
    
)

db.products.aggregate(
    [
        {
            $sort:{price:-1}
        },
        {
            $limit:1
        },
        {
            $lookup:{
                from:"categories",
                localField:"category_id",
                foreignField:"_id",
                as:"category"
            }
        }
    ]
)

db.products.find({
    $expr:
    {
        $and:[{
            $gt:["$price",500],
        },
        {
                $lt:["$price",700]
        }]
    }
}).count()

db.orders.find({$and:[{price:{$gt:500}},{currency:"USD"}]})

db.orders.updateOne({_id:ObjectId('6851527e54dcf9cdc8600d40')},{$inc:{total_amount:-10}})