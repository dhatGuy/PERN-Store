module.exports = {
  // operation's method
  get: {
    tags: ["Orders"], // operation's tag
    description: "Get all orders", // short desc
    summary: "Get all orders",
    operationId: "getOrders", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [],
    // expected responses
    responses: {
      // response code
      201: {
        description: "Orders obtained successfully", // response desc
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
