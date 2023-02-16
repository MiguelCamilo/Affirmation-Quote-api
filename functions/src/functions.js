import { dbConnect } from "./dbConnect.js"
import { FieldValue } from "firebase-admin/firestore"

export function getQuotes(req, res) {
    const db =  dbConnect()
    
    db.collection('affirmations').orderBy('createdAt', 'desc').get()
    .then(collection => {
        const quotes = collection.docs.map(doc => ({id: doc.id, ...doc.data() }))
        res.send(quotes)
    })
    .catch(err => res.status(500).json({ error: err.message }))
}


export function addQuote(req, res) {
    const {quote, name} = req.body
    const newQuote = { quote, name, createdAt: FieldValue.serverTimestamp()}
    const db = dbConnect()

        db.collection('affirmations').add(newQuote)
        .then(() => getQuotes(req, res))
        .catch(err => res.status(500).send({ error: err.message }))
}


// export function getQuotes(req, res) {
//     const db = dbConnect()

//     db.collection('affirmations').get()
//     .then((snapshot) => {
//         const quotes = snapshot.docs.map(doc => {
            
//             let quote = doc.data()
//             quote.id = doc.id
//             return quote
//         })
//         res.send(quotes)
//     })} 
