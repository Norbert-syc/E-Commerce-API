import {Product} from "../Models/ProductModel"; 

const Products: Product[] = [
  { id: "1", name: "Laptop", price: 999, categoryId: "1", description: "High-performance laptop", quantity: 10 },
  { id: "2", name: "Smartphone", price: 699, categoryId: "1", description: "Latest smartphone", quantity: 25 },
  { id: "3", name: "T-Shirt", price: 29, categoryId: "2", description: "Cotton t-shirt", quantity: 50 },
  { id: "4", name: "Jeans", price: 59, categoryId: "2", description: "Denim jeans", quantity: 30 },
  { id: "5", name: "Novel", price: 15, categoryId: "3", description: "Bestselling novel", quantity: 100 }
];

export default Products;