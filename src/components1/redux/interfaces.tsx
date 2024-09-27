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
    isSeller: string,
    firstName: string,
    lastName: number,
}

export interface CartItem {
    product: Product,
    quantity: number,
}


export interface Order {
    id: number,
    userId: number,
    totalAmount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
}
