const express = require("express");
const cors = require('cors');
require('dotenv').config()
const { Web5 } = require("@web5/api");
const { webcrypto } = require("node:crypto");
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const app = express()
const PORT = process.env.PORT || 3500
app.use(express.json())
app.use(cors({ origin: '*'}));


async function hi() {
    console.log('Connecting to web5...')
    const {web5, did}= await Web5.connect()
    console.log(web5)
    console.log(did)


}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/create', async (req, res) => {
    try{
        const { web5, did: newUserDid } = await Web5.connect();
        res.status(200).send({
            status: 'success',
            message: 'User DID created succesfully',
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
        const { web5 } = await Web5.connect();

        const did = await web5.did.resolve(userDid);
        if(did.didResolutionMetadata.error != null){
            throw new Error(did.didResolutionMetadata.error)
        }

        res.status(200).send({
            status: 'success',
            message: 'Authentication Success!!!',
            data: {
                did: did.didDocument.id
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
