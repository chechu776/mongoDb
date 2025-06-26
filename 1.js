// //Calculate total monthly revenue for the last 5 years
//  Determine how much money your business earned each month over the past five years.
//  Example: In January 2021, your sales totaled $50,000.


db.payments.aggregate([
    {
        $addFields: {
            payment_date:
            {
                $dateFromString: {
                    dateString: "$payment_date"
                }
            }
        }
    },
    {
        $match: {
            $expr: {
                $gte: [
                    "$payment_date",
                    {
                        $dateSubtract: {
                            startDate: "$$NOW",
                            unit: "year",
                            amount: 1
                        }
                    }
                ]
            }



        }
    },
    { $group: { _id: { year: { $year: "$payment_date" }, month: { $month: "$payment_date" } }, totalRevenue: { $sum: "$amount" } } }
    , { $sort: { "_id.year": 1, "_id.month": 1 } }
])