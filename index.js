const { PrismaClient } = require("@prisma/client")
const express = require("express")
const prisma = new PrismaClient

const app = express()

app.get("/", async (req, res) => {
    const productsData = await prisma.product.findMany()

    res.json({ message: "Data sent Successfully", data: productsData })
})

app.get("/:product_id", async(req, res) => {
    const { product_id } = req.params;

    const productsData = await prisma.product.findUnique({
        where: {
            product_id: product_id,
        }
    })

    if (productsData === null)
    {
        res.status(404).json({ message: "No Product found"})
    }
    else{
        res.status(200).json({ message: "Data sent Successfully", data: productsData })
    }
})


app.listen(4000)