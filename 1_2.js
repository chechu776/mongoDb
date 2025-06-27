

// Show monthly order volume trend year-over-year
//  Count the number of orders placed each month and compare trends across different years.
//  Example: In January 2020, you received 400 orders; in January 2021, you received 450 orders.


db.orders.aggregate([

    {
        $group: {
            _id: {
                year: { $year: "$order_date" },
                month: { $month: "$order_date" },
               
            },
        orders: { $sum: 1 }

        }
    },
    {
        $sort: {
            "_id.month": 1,
            "_id.year": 1
        }
    }
])