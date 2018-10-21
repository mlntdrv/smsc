const generateMsgId = require('./msgIdGen.js').generateMsgId; //safe to require ACL

function createSm(from, to, text){
    return {
        source      : from,
        destination : to,
        userData    : text,
        id          : generateMsgId()
    };
}

module.exports = {createSm : createSm};