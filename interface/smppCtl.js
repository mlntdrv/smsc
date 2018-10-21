const SMPP_LISTENING_PORT = 2775;
const SMPP_CMD = { // supported smpp commands
    BIND_TRX  : 'bind_transceiver',
    UNBIND    : 'unbind',
    SUBMIT_SM : 'submit_sm'
};

const smpp = require('smpp');

const esmeRepo = require('../infrastructure/esmeRepo.js');
const checkEsmePwd =
    require('../application/esmeConnectionProcessor.js')(esmeRepo).checkEsmePwd;

const smRepo = require('../infrastructure/smRepo.js');
const processSm = require('../application/smProcessor.js')(smRepo).processSm;

let smppSession;
const smppSrv = smpp.createServer((session) => {
    smppSession = session;

    smppSession.on(SMPP_CMD.BIND_TRX,  onBindTrx);
    smppSession.on(SMPP_CMD.UNBIND,    onUnbind);
    smppSession.on(SMPP_CMD.SUBMIT_SM, onSubmitSm);
});

function onBindTrx(pdu){
    console.log('New BIND_TRX request from ' + pdu.system_id);
    
    smppSession.pause();
    
    smppSession.systemId = pdu.system_id;
    
    checkEsmePwd(pdu.system_id, pdu.password).then(res => {
        console.log('BIND_TRX result', res);
        smppSession.send(pdu.response({command_status : smpp.ESME_ROK}));
        smppSession.resume();
    }).catch(err => {
        console.log(err.message);
        smppSession.send(pdu.response({command_status : smpp.ESME_RINVPASWD}));
        smppSession.close();
    });
}

function onUnbind(pdu){
    smppSession.send(pdu.response({command_status : smpp.ESME_ROK}));
    
    smppSession.close();
}

function onSubmitSm(pdu){
    console.log('New SM for ' + pdu.destination_addr +
        ' submitted by ' + smppSession.systemId + ', text:', pdu.short_message);
        
    smppSession.pause();
        
    processSm(pdu.source_addr, pdu.destination_addr, pdu.short_message.message)
        .then(id => {
            console.log('Message is stored with id: ', id)
            smppSession.send(pdu.response({command_status : smpp.ESME_ROK}));
            smppSession.resume();
            
        })
        .catch(err => {
            console.log(err.message);
            smppSession.send(pdu.response({command_status : smpp.ESME_RSYSERR}));
            smppSession.resume();
        });
}

smppSrv.listen(SMPP_LISTENING_PORT);
console.log('smpp-smsc up, listening on port ' + SMPP_LISTENING_PORT);