// Calculate monthly customer acquisition growth
//  Track how many new customers signed up each month.
//  Example: In March 2022, 50 new customers joined.




db.users.aggregate([{
    $group:{
        _id:{
            year:{$year:"$joined_date"},
            month:{$month:"$joined_date"}
        },
        users:{$sum:1}
        }
    },
    {
        $sort:{"_id.year":1,"_id.month":1}
    }
])