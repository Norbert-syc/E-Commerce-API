import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the E-commerce application",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://e-commerce-api-2ckt.onrender.com"
            : "http://localhost:4000",
        description: "Main API server",
      },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: "auth", description: "Authentication endpoints" },
      { name: "categories", description: "Category management" },
      { name: "products", description: "Product management" },
      { name: "carts", description: "Cart operations" },
      { name: "orders", description: "Order management" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        /* ================= USERS ================= */
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: {
              type: "string",
              enum: ["user", "admin", "vendor"],
              default: "user",
            },
          },
        },

        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        /* ================= CATEGORIES ================= */
        Category: {
          type: "object",
          required: ["name", "image"],
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            image: { type: "string" },
          },
        },

        /* ================= PRODUCTS ================= */
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            categoryId: { type: "string" },
            quantity: { type: "number" },
            image: { type: "string" },
          },
        },

        /* ================= CART ================= */
        CartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: {
              type: "string",
              example: "64f1a2b9c12a3b00123abcd1",
            },
            quantity: {
              type: "number",
              example: 2,
            },
          },
        },

        Cart: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              example: "64f1a2b9c12a3b00123abcd1",
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem",
              },
            },
          },
        },

        /* ================= ORDERS ================= */
        OrderItem: {
          type: "object",
          required: ["productId", "quantity", "price"],
          properties: {
            productId: {
              type: "string",
              example: "64f1a2b9c12a3b00123abcd1",
            },
            quantity: {
              type: "number",
              example: 1,
            },
            price: {
              type: "number",
              example: 49.99,
            },
          },
        },

        Order: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65aa12fbc45de90012abcd99",
            },
            userId: {
              type: "string",
              example: "64f1a2b9c12a3b00123abcd1",
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
            totalAmount: {
              type: "number",
              example: 99.98,
            },
            status: {
              type: "string",
              enum: ["pending", "paid", "shipped"],
              example: "pending",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  /* 🔥 VERY IMPORTANT */
  apis: ["./src/routes/*.ts"],
});

export default swaggerSpec;
