import { Router } from 'express';
import { filterByBrand, filterByName, filterByPrice } from '../utils/filterByParam';
const productRoute = Router();

export type ProductType = {
    id: number,
    name: string,
    brand: string,
    price: number
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
    },
    {
        id: 7, name: 'Teclado mecanico g304', brand: 'Logitech', price: 300
    }
]

productRoute.get('/:prodPerPage/:currentPage', (req, res) => {
    const { prodPerPage, currentPage } = req.params as { currentPage: string, prodPerPage: string };
    const { name, brand, price } = req.query as { name?: string, brand?: string, price?: number };
    try {

        let products: ProductList;

        if (name) {
            products = filterByName(name.toString(), productList)
        } else if (brand) {
            products = filterByBrand(brand.toString(), productList)
        } else if (price) {
            products = filterByPrice(Number(price), productList)
        } else {
            products = productList
        }

        const productsPaginated = products.slice(Number(currentPage) * Number(prodPerPage) - Number(prodPerPage), Number(currentPage) * Number(prodPerPage))

        if (productsPaginated.length === 0) throw new Error('No se encontraron productos')

        const numberOfPages = Math.ceil(products.length / Number(prodPerPage))

        let pages: number[] = []
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i)
        }
        res.status(200).json({ products: productsPaginated, pages: pages, totalProducts: productList.length });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
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
    const { id, name, brand, price } = req.body as { id: number, name: string, brand: string, price: number };
    try {
        if (!name && !brand && !price) throw new Error("Por favor provea algún parametro para modificar");
        const index = productList.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("El producto suministrado no ha sido encontrado");

        if (name) productList[index].name = name;
        if (brand) productList[index].brand = brand;
        if (price) productList[index].price = price;

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