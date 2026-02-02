export interface CartItem {
    productId: any; // ObjectId reference to Product
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[]; 
}   