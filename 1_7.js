

// Identify seasonality patterns by product category
//  Determine if certain product categories perform better in specific seasons or months.
//  Example: Toy sales peak every December.

db.orders.aggregate(
    [

        {
            $lookup: {
                from: "products",
                localField: "items.product_id",
                foreignField: "_id",
                as: "products",
                // pipeline:[
                //     {
                //         $count:"categories"
                //     }
                // ]
            }
        },
        {
            $unwind: "$products"
        },
        {
            $lookup: {
                from: "categories",
                localField: "products.category_id",
                foreignField: "_id",
                as: "category",
            }
        },
        {
            $unwind: "$category"
        },
        {
            $group: {
                _id: {
                    year: { $year: "$order_date" },
                    month: { $month: "$order_date" },
                    category_name: "$category.name"
                },
                orders: { $sum: 1 },
            }
        },

        {
            $sort: { "_id.year": 1, "_id.month": 1, "orders": -1 }
        },
        {
            $group: {
                _id: {
                    year: "$_id.year",
                    month:  "$_id.month" 
                },
                category_name: { $first: "$_id.category_name" }
                ,orders:{$first:"$orders"}
            }
        },
    ],
)