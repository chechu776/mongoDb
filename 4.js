// Identify peak sales months each year
//  Identify the months with the highest sales each year.
//  Example: December consistently had the highest sales of $100,000.


db.orders.aggregate([
    {
        $group: {
            _id: {
                year: { $year: "$order_date" },
                month: { $month: "$order_date" },

            },

            total_amount: { $sum: "$total_amount" },
        }
    },
    {
        $sort:{"_id.year":1,total_amount:-1}
    },
    {
        $group:{
            _id:"$_id.year",
            month:{$first:"$_id.month"},
            total_amount:{$first:"$total_amount"}
        }
    },
    // {
    //     $group:{
    //         _id:"$_id.year",
    //         maxTotalAmount:{$max:"$total_amount"}
    //     }
    // },
    {
        $sort: ({ "_id": 1 })
    },
])