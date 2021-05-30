module.exports = {
  // operation's method
  put: {
    tags: ["Cart"], // operation's tag
    description: "Increase item quantity", // short desc
    summary: "Increase item quantity",
    operationId: "increment", // unique operation id
    parameters: [],
    security: [
      {
        JWT: [],
      },
    ],
    // expected responses
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
                description: "ID of product to increase quantity from cart",
                example: 34,
              },
            },
          },
        },
      },
    },
    responses: {
      // response code
      200: {
        description: "Quantity increased successfully", // response desc.
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
