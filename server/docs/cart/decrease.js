module.exports = {
  // operation's method
  put: {
    tags: ["Cart"], // operation's tag
    description: "Decrease item quantity", // short desc
    summary: "Decrease item quantity",
    operationId: "decrement", // unique operation id
    parameters: [],
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
              id: {
                type: "number",
                description: "ID of product to decrease quantity from cart",
                example: 34,
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
        description: "Quantity decreased successfully", // response desc.
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
      // response code
      401: {
        description: "Unauthorized",
      },
      // response code
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
