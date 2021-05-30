module.exports = {
  // operation's method
  delete: {
    tags: ["Products"], // operation's tag
    description: "Delete product", // short desc
    summary: "Delete a product",
    operationId: "deleteProduct", // unique operation id
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A product id", // param desc.
      },
    ], // expected params
    security: [
      {
        JWT: [],
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Product deleted successfully", // response desc
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "Product not found",
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
