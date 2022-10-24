import { Router } from 'express';
const productRoute = Router();

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

productRoute.get('/', (req, res) => {
    res.status(200).json(productList);
})

productRoute.post('/', (req, res) => {
    const { name, marca } = req.body;
    try {
        if (!name || !marca) throw new Error("che no me pasaste todos los datos");
        productList.push({ id: new Date().getTime(), name, marca })
        res.status(200).json(productList.slice(-1)[0]);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

productRoute.put('/', (req, res) => {
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

productRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id.split(':')[1])
    try {
        if (!id) throw new Error("che no me pasaste ningún id");
        const index = productList.findIndex((product) => product.id === Number(id.split(':')[1]));
        console.log(index)
        if (index === -1) throw new Error("No se encontro ningún producto con el id suministrado");
        const productDeleted = productList.splice(index, 1)[0]
        console.log(productDeleted)
        res.status(200).json(productDeleted)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default productRoute;