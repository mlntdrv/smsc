const smRepo = {sms : []};

smRepo.add = function(sm){
    return new Promise(resolve => {
        // Do async job mock
        setTimeout(() => {
            smRepo.sms.push(sm);
            
            resolve(true);
        }, 1000);
    });
}

smRepo.get = function(){    
    return new Promise(resolve => {
        // Do async job mock
        setTimeout(() => {resolve(smRepo.sms)}, 1000);
    });
}

module.exports = smRepo;