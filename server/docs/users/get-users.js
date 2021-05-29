module.exports = {
  // method of operation
  get: {
    tags: ["Users"], // operation's tag.
    description: "Get users", // operation's desc.
    summary: "Get all users",
    operationId: "getUsers", // unique operation id.
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Users were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // user model
            },
          },
        },
      },
      401: {
        description: "Unauthorized", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      500: {
        description: "Internal Server error", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
