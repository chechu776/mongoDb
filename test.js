db.runCommand({collMod:'users',
    validator: {
        $jsonSchema:{
    bsonType: 'object',
    required: ['name', 'age','Course'],
    properties:
    {
        name: {
            bsonType: 'string',
            description: 'name is required'
        },
        age:{
            bsonType:'number',
            description:'age is required'
        },
        Course:{
            bsonType:'string',
            description:'course is required'
        }
    }
}},
    validationLevel:'strict',
    validationAction:'error'
})

db.createCollection('users', {
    validator: {
        $jsonSchema:{
    bsonType: 'object',
    required: ['name', 'age'],
    properties:
    {
        name: {
            bsonType: 'string',
            description: 'name is required'
        },
        age:{
            bsonType:'number',
             description:'age is required' }
            }
        }
    }
})




db.members.find({$or:{membershipType:"Gold"},})

