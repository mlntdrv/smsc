const SMS_COLLECTION = 'sms';

const {Mongo} = require('mongodb-pool');
const connCfg = require('./mongoConnCfg.js');

const smRepo = {};

smRepo.add = async function(sm){
    return (async () => {
        await Mongo.connect(...connCfg);
        const db = Mongo.getDb();
        
        const res = await db.collection(SMS_COLLECTION).insertOne(sm);
        
        if(res.insertedCount > 0) return true;
        throw new Error('Failed to store SM.');
    })();
}

smRepo.get = async function(){
    return (async () => {
        await Mongo.connect(...connCfg);
        const db = Mongo.getDb();
        
        const res = await db.collection(SMS_COLLECTION)
                            .find({}, {_id : 0}).toArray();
        
        if(res.length > 0) return res;
        throw new Error('Failed to retrieve SMs.');
    })();
}

module.exports = smRepo;