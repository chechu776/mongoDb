db.orders.aggregate(
    [   
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "name"
            }
        },
        {
            $unwind: "$name"
        },
        {
            $group:{
                _id:{
                    name:{$concat:["$name.first_name"," ","$name.last_name"]},
                    country:"$shipping_address.country"
                }
            }
        },
        {
            $sort:{"_id.name":1}
        }
    ]
)