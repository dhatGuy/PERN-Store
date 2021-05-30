module.exports = {
  // operation's method
  post: {
    tags: ["Products"], // operation's tag
    description: "Create product", // short desc
    summary: "Create a product",
    operationId: "createProduct", // unique operation id
    parameters: [], // expected params
    security: [
      {
        JWT: [],
      },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object", // data type
            properties: {
              name: {
                type: "string", // data-type
                description: "Product's name", // desc
              },
              price: {
                type: "integer", // data-type
                description: "Product price", // desc
              },
              description: {
                type: "string", // data-type
                description: "Product description", // desc
              },
              image_url: {
                type: "string", // data-type
                description: "product's image url", // desc
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Product created successfully", // response desc
      },
      401: {
        description: "Unauthorized",
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
