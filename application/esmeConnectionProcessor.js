module.exports = (esmeRepo) => {
    const createEsme = require('../domain/Esme.js').createEsme;
    
    function checkEsmePwd(systemId, pwd){
        const esme = createEsme(systemId, pwd);
        
        return new Promise((resolve, reject) => {
            esmeRepo.find(esme)
                .then(isPwdCorrect => resolve(isPwdCorrect))
                .catch(err => reject(new Error('ESME password is wrong.')));
        });
    }
    
    return {checkEsmePwd : checkEsmePwd};
}