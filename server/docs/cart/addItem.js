module.exports = {
  // operation's method
  post: {
    tags: ["Cart"], // operation's tag
    description: "Add an item to cart", // short desc
    summary: "Add an item",
    operationId: "addItem", // unique operation id
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
            type: "object",
            properties: {
              product_id: {
                type: "number",
              },
              quantity: {
                type: "number",
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "item added successfully", // response desc
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem",
              },
            },
          },
        },
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
