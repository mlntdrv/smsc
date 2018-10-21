const esmeRepo = {esme: [{systemId : 'esme1', pwd : 'pwd1'},
                         {systemId : 'esme2', pwd : 'pwd2'}]};

esmeRepo.find = function(esme){    
    return new Promise((resolve, reject) => {
        // Do async job mock
        setTimeout(() => {
            const res = this.esme.findIndex(e => {
                return e.systemId == esme.systemId && e.pwd == esme.pwd});
            
            if(res === -1) return reject(new Error('ESME not found.'));
            
            resolve(true);
        }, 1000);
    });
}

module.exports = esmeRepo;