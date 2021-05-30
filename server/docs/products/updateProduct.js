module.exports = {
  // operation's method
  put: {
    tags: ["Products"], // operation's tag
    description: "Update product", // short desc
    operationId: "updateProduct", // unique operation id
    summary: "Update a product",
    parameters: [], // expected params
    security: [
      {
        JWT: [],
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Product updated successfully", // response desc
      },
      // response code
      404: {
        description: "Product not found",
      },
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
