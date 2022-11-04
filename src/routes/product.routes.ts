import { Router } from 'express';
const productRoute = Router();

type ProductType = {
    id: number,
    name: string,
    brand: string,
    price: number,
}

type ProductList = ProductType[]

const productList: ProductList = [
    {
        id: 1, name: "chocolate", brand: "chevrolet", price: 50
    },
    {
        id: 2, name: 'gaseosa cola', brand: 'coca cola', price: 5
    },
    {
        id: 3, name: 'Iphone 13', brand: 'Apple', price: 1200
    },
    {
        id: 4, name: 'Mouse G304', brand: 'Logitech', price: 200
    },
    {
        id: 5, name: 'Teclado mecanico', brand: 'Hyperx', price: 350
    },
    {
        id: 6, name: 'Auriculares gamer', brand: 'Logitech', price: 300
    }
]

productRoute.get('/:currentPage', (req, res) => {
    const { currentPage } = req.params;

    res.status(200).json(productList.slice(Number(currentPage) * 4 - 4, Number(currentPage) * 4));
})

productRoute.post('/', (req, res) => {
    const { name, brand, price } = req.body;
    try {
        if (!name || !brand || !price) throw new Error("Por favor provea todos los datos del productos");
        productList.push({ id: new Date().getTime(), name, brand, price })
        res.status(200).json(productList.slice(-1)[0]);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

productRoute.put('/', (req, res) => {
    const { id, name, brand, price } = req.body;
    try {
        if (!name && !brand && !price) throw new Error("Por favor provea algún parametro para modificar");
        const index = productList.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("El producto suministrado no ha sido encontrado");

        if (brand) {
            productList[index].brand = brand;
        }
        if (name) {
            productList[index].name = name;
        }
        res.status(200).json(productList[index]);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

productRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("Por favor provea un producto para eliminar");
        const index = productList.findIndex((product) => product.id === Number(id.split(':')[1]));
        if (index === -1) throw new Error("El producto solicitado para eliminar no ha sido encontrado");
        const productDeleted = productList.splice(index, 1)[0]
        console.log(productDeleted)
        res.status(200).json(productDeleted)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default productRoute;