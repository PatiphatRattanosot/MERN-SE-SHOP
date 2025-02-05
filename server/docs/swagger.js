const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "SE Shop REST API",
    description: "RESTful API for SE Shop",
    contact: {
      name: "Patiphat Rattanosot",
      url: "https://github.com/PatiphatRattanosot",
      email: "654259017@webmail.npru.ac.th",
    },
  },
  servers: [
    {
      url: "http://localhost:3000", // by default: 'http://localhost:3000'
      description: "Local", // by default: ''
    },
    {
      url: "http://render.com:3000", // by default: 'http://localhost:3000'
      description: "Online", // by default: ''
    },
    // { ... }
  ],
  tags: [
    {
      name: "Product", // Tag name
      description: "API For Product Object", // Tag description
    },
    // { ... }
  ],
  paths: {
    "/api/product/": {
      post: {
        tags: ["Product"],
        summary: "Create a new product",
        description: "Endpoint to create a new product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas.NewProduct",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas.ProductResponse",
                },
              },
            },
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/product/{id}": {
      get: {
        tags: ["Product"],
        summary: "Get product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Product fetched successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas.ProductResponse",
                },
              },
            },
          },
          404: {
            description: "Product Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          price: { type: "number" },
        },
      },
      Cart: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          price: { type: "number" },
        },
      },
      NewProduct: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: { type: "string" },
        },
        example: {
          name: "Mechanical Keyboard",
          description: "A mechanical keyboard with RGB lighting",
          price: 100,
          category: "gadget",
        },
      },
      ProductResponse: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          price: { type: "number" },
          category: { type: "string" },
        },
        example: {
          name: "Mechanical Keyboard",
          description: "A mechanical keyboard with RGB lighting",
          image: "https://example.com/image.jpg",
          price: 100,
          category: "gadget",
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
