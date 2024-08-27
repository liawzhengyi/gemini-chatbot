// const PORT = 3000
import express, { json } from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(json())
require('dotenv').config()

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

app.post('/gemini', async (req,res) => {
    // console.log(req.body.history)
    // console.log(req.body.message)
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})

    const chat = model.startChat({
        history: req.body.history
    })
    const msg = req.body.message

    const result = await chat.sendMessage(msg)
    const response = result.response
    const text = response.text()
    res.send(text)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
