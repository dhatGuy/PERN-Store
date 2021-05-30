module.exports = {
  // operation's method.
  delete: {
    tags: ["Cart"], // operation's tag
    description: "Removing a item", // short desc
    summary: "Remove item from cart",
    operationId: "removeItem", // unique operation id
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
                description: "ID of product to remove from cart",
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
        description: "Item removed successfully", // response desc
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
