module.exports = {
  // method of operation
  get: {
    tags: ["Products"], // operation's tag.
    description: "Get products", // operation's desc.
    summary: "Get all products",
    operationId: "getProducts", // unique operation id.
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Products obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error", // response desc.
      },
    },
  },
};
