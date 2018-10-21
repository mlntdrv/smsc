// Anti-corruption layer between the domain and 'uniqid'
const uniqid = require('uniqid');

function generateMsgId(){
    let id = '';
    let tmpId = uniqid();
    
    for(let i = 0; i <= tmpId.length - 1; i++){
        id += tmpId.charCodeAt(i).toString();
    }
    
    return id;
}

module.exports = {generateMsgId : generateMsgId};