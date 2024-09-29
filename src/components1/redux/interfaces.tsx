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
    sellerId: number
    approved: boolean
}

export interface User {
    id?: string,
    email: string,
    isSeller: string,
    firstName: string,
    lastName: number,
    mobile: string,
}

export interface CartItem {
    product: Product,
    quantity: number,
}


export interface OrderItem {
    id: number,
    title: string,
    userId: number,
    productId: number,
    price: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
}


export interface Address {
    id: number,
    userId: number,
    houseNumber: number,
    street_address: number,
    pincode: number,
    createdAt: Date,
    updatedAt: Date,
}


export interface AlertData {
    message: string;
    type: 'Error' | 'Notification';
    date: Date,
}
