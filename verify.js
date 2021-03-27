require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let serviceSid

client.verify.services.create({friendlyName: 'Easywork'})
    .then(service => {
        serviceSid = service.sid
        console.log(serviceSid)
            return client.verify.services(serviceSid).verifications
            .create({
                to: '+998933968322',
                channel: 'sms'
            })
    })
    .then(verification => client.verify.services(serviceSid)
        .verificationChecks
        .create({to: '+998933968322', code: '123456'})
        .then(verification_check => console.log(verification_check.status)))
    .catch(e => console.log(e.message));
