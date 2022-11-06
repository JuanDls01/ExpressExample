import { ProductType } from "src/routes/product.routes";

export const filterByName = (name: string, array: Array<ProductType>) => {
    const productsFiltered = array.filter((product) => product.name.toLowerCase().includes(`${name.toLowerCase()}`))
    return productsFiltered;
}

export const filterByBrand = (brand: string, array: Array<ProductType>) => {
    const productsFiltered = array.filter((product) => product.brand.toLowerCase().includes(`${brand.toLowerCase()}`))
    return productsFiltered;
}

export const filterByPrice = (price: number, array: Array<ProductType>) => {
    const productsFiltered = array.filter((product) => product.price === price)
    return productsFiltered;
}