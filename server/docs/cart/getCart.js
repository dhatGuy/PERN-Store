module.exports = {
  // method of operation
  get: {
    tags: ["Cart"], // operation's tag.
    description: "Get cart", // operation's desc.
    summary: "Get cart items",
    operationId: "getCart", // unique operation id.
    parameters: [], // expected params.
    security: [
      {
        JWT: [],
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Cart obtained", // response desc.
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
      500: {
        description: "Server error",
      },
    },
  },
};
