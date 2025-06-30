db.orders.aggregate(
    [
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $group: {
                _id: {
                    loyalty_tier: "$user.loyalty_tier"
                },
                total_revenue:{$sum:"$total_amount"}
            }
        }
    ]
)