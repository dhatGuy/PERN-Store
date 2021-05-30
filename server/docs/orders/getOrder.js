module.exports = {
  // operation's method
  get: {
    tags: ["Orders"], // operation's tag
    description: "Get an order", // short desc
    summary: "Get an order by id",
    operationId: "getOrder", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/id", // id model
        },
        required: true, // mandatory
        description: "Id of order", // short desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Order obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Order",
            },
          },
        },
      },
      404: {
        description: "Order not found",
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
