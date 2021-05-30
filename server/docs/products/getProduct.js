module.exports = {
  // method of operation
  get: {
    tags: ["Products"], // operation's tag.
    description: "Get a product", // operation's desc.
    summary: "Get a product by id",
    operationId: "getProduct", // unique operation id.
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
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Product obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      404: {
        description: "Product not found",
      },
      500: {
        description: "Internal server error", // response desc.
      },
    },
  },
};
