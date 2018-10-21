const ESME_COLLECTION = 'esme';

const {Mongo} = require('mongodb-pool');
const connCfg = require('./mongoConnCfg.js');

const esmeRepo = {};

esmeRepo.find = async function(esme){
    return (async () => {
        await Mongo.connect(...connCfg);
        const db = Mongo.getDb();
        
        const res = await db.collection(ESME_COLLECTION).find(esme).toArray();
        if(res.length == 0) throw new Error('ESME not found.');
        return true;
    })();
}

module.exports = esmeRepo;