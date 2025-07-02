db.orders.createIndex({ user_id: 1, "items.product_id": 1 });

db.orders.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "users",
        },
    },
    {
        $lookup: {
            from: "products",
            localField: "items.product_id",
            foreignField: "_id",
            as: "product_details",
        },
    },
]);
