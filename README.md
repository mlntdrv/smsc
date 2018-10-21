# smsc
An extremely simplified and somewhat totally incomplete demo of an SMS centre. Features:

* ESME sessions support thru SMPP (supported commands are bind\_trx, unbind)
* SM submission over SMPP (supported command is submit\_sm), message ID generation and message storage in memory

## Usage
1. Copy everything to a local directory e.g. smsc
2. Start with node.js:
    node smsc/interface/smppCtl.js
3. Begin flooding it with bind requests and message submissions. Examples in test/

**NB:** *For some reason, the mongodb-pool module doesn't work well with mongodb >= 3.0. Tested with mongodb-2.2.33*