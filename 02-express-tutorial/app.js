const express = require('express')
const app = express()
const { products } = require("./data")

app.use(express.static('./public'))

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

    if(search) {
        sortedProductList = sortedProductList.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if(limit) {
        sortedProductList = sortedProductList.slice(0, Number(limit))
    }

    if(search) {
        sortedProductList = sortedProductList.filter((product) => {
            if(product.name === search) {
                return product.name
            }
        })
    }

    if(price) {
        sortedProductList = sortedProductList.filter((product) => {
            if(product.price < 11) {
                return product
            }
        })
    }

    res.status(200).json(sortedProductList)
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})
