db.orders.aggregate(
    [
        {
            $count: "orders"
        },
        {
            $lookup: {
                from: "support_tickets",
                // localField: "_id",
                // foreignField: "order_id",
                pipeline: [
                    {
                        $count: "support_tickets"
                    }
                ],
                as: "supportTickets"
            }
        },
        {
            $unwind: "$supportTickets"
        },
        {
            $project: {
                percentage_of_support_tickets: {
                        $multiply:[
                            {$divide:["$supportTickets.support_tickets", "$orders"]},100
                        ]
                }
            }
        }
    ]
)