import functions from "firebase-functions"
import express from "express"
import cors from "cors"

import { addQuote, getQuotes } from "./src/functions.js"

const app = express()
app.use(cors())
app.use(express.json())

app.post('/quotes', addQuote)

app.get('/quotes', getQuotes)



export const api = functions.https.onRequest(app)
