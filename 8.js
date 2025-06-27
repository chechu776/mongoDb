// Build full year-over-year revenue growth comparison
//  Compare overall sales growth or decline between years.
//  Example: Revenue was $500,000 in 2020 and grew to $600,000 in 2021.

db.orders.aggregate(
    [
        {
            $group:{
                _id:{
                    year:{$year:"$order_date"}
                },
                totalRevenue:{$sum:"$total_amount"}
            }
        },
        {
            $sort:{"_id.year":1}
        }
    ]
)