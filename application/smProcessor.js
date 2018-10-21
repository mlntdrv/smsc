module.exports = (smRepo) => {
    const createSm = require('../domain/Sm.js').createSm;
    
    async function processSm(src, dest, msg){
        const sm = createSm(src, dest, msg);
        
        try{
            const addRes = await smRepo.add(sm);
            const msgQueue = await smRepo.get();
            console.log('Current msg queue: ', msgQueue);
            
            return sm.id;
        } catch(err){ throw err; }
    }
    
    return {processSm : processSm};
}