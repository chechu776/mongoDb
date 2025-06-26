db.orders.aggregate([
    {
    $group: {
        _id: {
            year: { $year: "$order_date" },
            month: { $month: "$order_date" },

        },
        totalOrders: { $sum: 1 },
        total_amount: { $sum: "$total_amount" },

    }
},
{
    $lookup: {
        from: "users",
        // localField: "user_id",
        // foreignField: "_id",
        as: 'totalUsers',
        pipeline: [{
            $count: "totalUsers"
        }]
    }
},
{
    $addFields:{
        totalUsers:{$arrayElemAt:["$totalUsers.totalUsers",0]}
    }
},
{
    $addFields:{
        average_amount_user_spend:{$divide:["$total_amount","$totalUsers"]}
    }
},
{
    $sort:{"_id.year":1,"_id.month":1}
}
])