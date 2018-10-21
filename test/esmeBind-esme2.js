const SMPP_DEST_PORT = 2775;

const smpp = require('smpp');

let session = smpp.connect('smpp://localhost:' + SMPP_DEST_PORT);
session.bind_transceiver({
	system_id: 'esme2',
	password: 'pwd2'
}, function(pdu) {
    console.log(pdu);
	if (pdu.command_status === 0) {
		// Successfully bound
        console.log('Successfully bound');
		session.submit_sm({
            source_addr : '222',
			destination_addr: '0883447066',
			short_message: 'Econt: Imate pratka No 124'
		}, function(pdu) {
            console.log(pdu);
			if (pdu.command_status === 0) {
				// Message successfully sent
				console.log(pdu.message_id);
			}
            
            session.unbind(function(pdu){
                console.log(pdu);
                if(pdu.command_status === 0)
                    return console.log('Unbind succeeded');
                
                console.log('Unbind failed');
            });
		});
	}
});