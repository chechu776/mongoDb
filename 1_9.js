

// Show monthly delivery performance averages
//  Calculate the average delivery duration per month.
//  Example: In June, average delivery time was 3.5 days.



db.orders.aggregate(
    [
        {
            $group: {
                _id: {
                    year: { $year: "$order_date" },
                    month: { $month: "$order_date" }
                },
                totalOrders: { $sum: 1 },
                totalDeliveryDays: { $sum: "$delivery_days" }
            }
        },
        {
            $addFields:{
                averageDeliveryDays:{$divide:["$totalDeliveryDays","$totalOrders"]}
            }
        },
        {
            $sort:{"_id.year":1,"_id.month":1}
        }
    ]
)