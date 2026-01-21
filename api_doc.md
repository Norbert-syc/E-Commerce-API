# API Documentation

Base URL: `http://localhost:3000`

## Health Check

### Check API Status
- **GET** `/api`
- **Response**: `"API is running"`

---

## Categories

### Get All Categories
- **GET** `/api/categories`
- **Response**: Array of categories

### Get Category by ID
- **GET** `/api/categories/:id`
- **Response**: Single category object

### Create Category
- **POST** `/api/categories`
- **Body**:
```json
{
  "name": "string",
  "description": "string (optional)"
}
```
- **Response**: Created category with generated ID

### Update Category
- **PUT** `/api/categories/:id`
- **Body**:
```json
{
  "name": "string ",
  "description": "string (optional)"
}
```
- **Response**: Updated category

### Delete Category
- **DELETE** `/api/categories/:id`
- **Response**: 204 No Content

---

## Products

### Get All Products
- **GET** `/api/products`
- **Response**: Array of products

### Get Product by ID
- **GET** `/api/products/:id`
- **Response**: Single product object

### Create Product
- **POST** `/api/products`
- **Body**:
```json
{
  "name": "string",
  "price": "number",
  "categoryId": "string",
  "description": "string",
  "quantity": "number"
}
```
- **Response**: Created product with generated ID

### Update Product
- **PUT** `/api/products/:id`
- **Body**:
```json
{
  "name": "string",
  "price": "number ",
  "categoryId": "string ",
  "description": "string ",
  "quantity": "number"
}
```
- **Response**: Updated product

### Delete Product
- **DELETE** `/api/products/:id`
- **Response**: 204 No Content

---

## Carts

### Get User Cart
- **GET** `/api/carts/:userID`
- **Response**: Cart object with items

### Add Item to Cart
- **POST** `/api/carts/:userID/items`
- **Body**:
```json
{
  "productId": "string"
}
```
- **Response**: Updated cart with new item
