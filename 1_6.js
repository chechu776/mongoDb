// Calculate monthly refund amounts and trends
//  Analyze the total refund amounts issued monthly.
//  Example: $1,500 was refunded in July 2021.


db.refunds.aggregate(
    [
        {
            $group:{
                _id:{
                    year:{$year:"$refund_date"},
                    month:{$month:"$refund_date"}
                },
                refund_amount:{$sum:"$refund_amount"}
            }
        },
        {
            $sort:{"_id.year":1,"_id.month":1}
        }
    ]
)