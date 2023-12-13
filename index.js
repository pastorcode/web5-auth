const express = require("express");
const cors = require('cors');
require('dotenv').config()
const { Web5 } = require("@web5/api");
const { webcrypto } = require("node:crypto");
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const app = express()
const PORT = process.env.PORT || 3500
app.use(express.json())
app.use(cors());


async function hi() {
    console.log('Connecting to web5...')
    const {web5, did}= await Web5.connect()
    console.log(web5)
    console.log(did)


}

let newUserDid = 'did:ion:7f6a8b1e3c4d5e9f2a1b3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f8a7b1e3c4d5e6f';


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/create', async (req, res) => {
    try{
        console.log('Connecting...');
        // const { web5, did: newUserDid } = await Web5.connect();
         res.status(200).send({
            status: 'success',
            message: 'User DID created successfully',
            data: {
                newUserDid
            }
        });
    }catch(e){
        res.status(500).send({
            status: 'error',
            message: e.message
        })
    }
});

app.post('/authenticate', async (req, res) => {
    const { userDid } = req.body
    try{
        // const { web5 } = await Web5.connect();
        //
        // const did = await web5.did.resolve(userDid);

        if(!userDid || userDid != newUserDid){
            throw new Error('Invalid DID')
        }

        res.status(200).send({
            status: 'success',
            message: 'Authentication Success!!!',
            data: {
                did: userDid
            }
        })
    }catch(e){
        res.status(500).send({
            status: 'error',
            message: e.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`App listneing on http://localhost:${PORT}`);
})
