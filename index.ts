import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

type ProductType = {
    id: number,
    name: string,
    marca: string,
}

type ProductList = ProductType[]

const productList: ProductList = [{
    id: 1,
    name: "chocolate",
    marca: "chevrolet"
}]

app.get('/product', (req, res) => {
    res.status(200).json(productList);
})

app.post('/product', (req, res) => {
    const { name, marca } = req.body;
    try {
        if (!name || !marca) throw new Error("che no me pasaste todos los datos");
        productList.push({ id: new Date().getTime(), name, marca })
        res.status(200).json(productList.slice(-1));
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.put('/product', (req, res) => {
    const { id, name, marca } = req.body;
    try {
        if (!name && !marca) throw new Error("che no me pasaste ningún parametro para modificar");
        const index = productList.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("No se encontro ningún producto con el id suministrado");
        productList[index] = { ...productList[index], name, marca }
        res.status(200).json(productList[index]);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.delete('/product', (req, res) => {
    const { id } = req.body;
    try {
        if (!id) throw new Error("che no me pasaste ningún id");
        const index = productList.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("No se encontro ningún producto con el id suministrado");
        const productDeleted = productList.splice(index, 1)
        res.status(200).json(productDeleted)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.listen(3000, () => {
    return console.log(`Server running on 3000`);
});