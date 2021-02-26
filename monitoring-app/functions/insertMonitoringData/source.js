exports = function(database, collection, measurements){
    var collection = context.services.get("mongodb-atlas").db(database).collection(collection);
    var doc = collection.insertMany(measurements);

};