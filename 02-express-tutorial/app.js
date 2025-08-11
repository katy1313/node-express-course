const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const peopleRouter = require('./routes/people.js')
const { products, people } = require("./data")
const auth = require('./controllers/auth.js')

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
  }

app.use(logger)
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false })) //parses url-encoded data, which is the format that is sent by an HTML form
app.use(express.json()) //parses a JSON body
app.use(cookieParser())
app.use(('/test'), auth)
app.use('/api/v1/people', peopleRouter)

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" })
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    //return res.json(req.params)
    const idToFind = parseInt(req.params.productID)  //convert query param to an integer.
    const product = products.find((p) => p.id === idToFind)
    if (!product) {
        return res.status(404).send('That product was not found.')
    }
    return res.json(product)
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query
    let sortedProductList = [...products]

    if (search) {
        sortedProductList = sortedProductList.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProductList = sortedProductList.slice(0, Number(limit))
    }

    if (search) {
        sortedProductList = sortedProductList.filter((product) => {
            if (product.name === search) {
                return product.name
            }
        })
    }

    if (price) {
        sortedProductList = sortedProductList.filter((product) => {
            if (product.price < 11) {
                return product
            }
        })
    }

    res.status(200).json(sortedProductList)
})

// app.get('/api/v1/people', (req, res) => {
//     res.json(people)
// })

// app.post('/api/v1/people', (req, res) => {
//     const name = req.body
//     if(!name) {
//         return res.status(400).json({ success: false, message: "Please provide a name" })
//     }
//      people.push({ id: people.length + 1, name: name })
//      res.status(201).json({ success: true, name: name })
// })
app.post('/logon', (req, res) => {
    const { name } = req.body
    if(name) {
        res
            .status(201)
            .send(`Welcome, ${name}`)
            .cookie('name', name)
    } else {
        res
            .status(400)
            .send('You are not authenticated.');
    }
    console.log(req.cookies)
})

app.delete('/logoff', (req, res) => {
    const name = req.body
    res
        .clearCookie(name)
        .status(200)
        .send(`You are logged off.`)
})

app.get('/test', auth, (req, res) => {
    res.status(200).json({success: true, message:`Welcome ${req.user}`})
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})

const array1 = [200, 201, 255, 300, 505];

const found = array1.find((element) => element > 240);

console.log(found);
