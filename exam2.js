db.users.aggregate(
    [
        
        {
            $lookup:{
                from:"orders",
                localField:"_id",
                foreignField:"user_id",
                pipeline:[
                    {
                        $count:"orders"
                    }
                ],
                as:"orders"
            }
        },
        {
            $set:{
                orders:{$arrayElemAt:["$orders.orders",0]}
            }
        }
    ]
)

db.orders.aggregate(
    [
        {
            $group:{
                _id:{
                    user_id:"$user_id"
                },
                total_orders:{$sum:1}
            }
        }
    ]
)

 ObjectId('6851527e54dcf9cdc8600d40')


 ObjectId('6851527e54dcf9cdc8600c1e')


 db.orders.updateOne({$and:[{_id: ObjectId('6851527e54dcf9cdc8600d40')},{"items.product_id": ObjectId('6851527e54dcf9cdc8600c1e')}]},
    {$set:{"items.quantity":3}}
    )

db.orders.aggregate(
    [
        
        {
            $group:{
                    _id:{
                        order_year:{$year:"$order_date"},
                        order_month:{$month:"$order_date"},
                        product_name:"$items.product_name"
                    },
                    total_sold:{$sum:"items.quantity"}
            }
        },
        {
            $sort:{"_id.year":1,"_id.month":1}
        }
        // {
        //     $match:{
        //         order_year:{$eq:2024}
        //     }
        // },
    ]
)

db.support_tickets.aggregate([
    {   
        $group:{
            _id:{
                issue_type:"$issue_type",
                resolved:"$resolved"
            },
            count:{$sum:1},
            resolved
        }
    }
])

db.products.find({
    $and:[{"price":{"$gt":500}},{"price":{"$lt":700}}]
})