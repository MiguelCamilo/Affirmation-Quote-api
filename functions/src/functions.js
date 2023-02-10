import dbConnect from "./dbConnect.js";

export function addQuote(req, res) {
    const {quote, name} = req.body

    const newQuote = {
        quote,
        name,
    }

    const db = dbConnect()

        db.collection('affirmations')
            .add(newQuote)
            .then(doc => res.status(201).send({ success: true, affimation: {quote, id: doc.id, name }}))
            .catch(err => res.status(500).send({ success: false, message: err.message }))

}

export function getQuotes(req, res) {
    const db = dbConnect()

    db.collection('affirmations').get()
    .then((snapshot) => {
        const quotes = snapshot.docs.map(doc => {

            let quote = doc.data()
            quote.id = doc.id
            return quote
        })
        res.send(quotes)
    })} 