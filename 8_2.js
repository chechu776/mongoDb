db.orders.aggregate(
    [
        {
            $group: {
                _id: {
                    order_date: {
                        $hour: "$order_date",
                    },
                    order_minute:{
                        $minute: "$order_date"
                    }
                }
            }
        }
    ]
)