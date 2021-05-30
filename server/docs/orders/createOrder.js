module.exports = {
  // operation's method
  post: {
    tags: ["Orders"], // operation's tag
    description: "Create an order", // short desc
    summary: "Place an order",
    operationId: "createOrder", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/OrderInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Order created successfully", // response desc
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Order",
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
