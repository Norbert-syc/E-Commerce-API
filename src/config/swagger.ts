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
      },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: "auth", description: "authentication endpoints" },
      { name: "categories", description: "category management" },
      { name: "products", description: "product management" },
      { name: "carts", description: "cart operations" },
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
        user: {
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

        registerRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        loginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        Category: {
          // ✅ PascalCase
          type: "object",
          required: ["name", "image"],
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            image: { type: "string" },
          },
        },

        product: {
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

        cart: {
          type: "object",
          properties: {
            userId: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/Routes/*.ts"],
});

export default swaggerSpec;
