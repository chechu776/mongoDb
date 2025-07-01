db.orders.aggregate(
    [
        {
            $facet: {
                order_count: [{
                    $count: "orders"
                }],
                orders_with_promo: [
                    {
                        $match: {
                            discount_code: { $ne: "" }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                promo: "$discount_code"
                            },
                            total: { $sum: 1 }
                        }
                    },
                ]
            },
        },
        {
            $unwind: "$orders_with_promo"
        },
        {
            $set: {
                order_count: { $arrayElemAt: ["$order_count.orders", 0] }
            }
        },
        {
            $group: {
                _id: "",
                promo_total: { $sum: "$orders_with_promo.total" },
                total_orders: { $first: "$order_count" }

            }
        },
        {
            $set: {
                rate: {
                    $multiply: [
                        { $divide: ["$promo_total", "$total_orders"] }, 100
                    ]
                }

            }

        }
    ]
) 