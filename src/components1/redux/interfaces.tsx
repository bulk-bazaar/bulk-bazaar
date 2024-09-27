export interface Product {
    id?: string,
    title: string,
    description: string,
    minimumQuantity: number,
    maximumQuantity: number,
    soldQuantity: number,
    mrp: string,
    price: string,
    units: string,
    sellerId: string
    approved: boolean
}
export interface User {
    id?: string,
    email: string,
    firstName: string,
    lastName: number,
}

export interface CartItem {
    product: Product,
    quantity: number,
}
