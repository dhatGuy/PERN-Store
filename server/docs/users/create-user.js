module.exports = {
  // operation's method
  post: {
    tags: ["Users"], // operation's tag
    description: "Create a user", // short desc
    summary: "Create a new user",
    operationId: "createUser", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [
      {
        name: "user",
        in: "body",
        description: "Details of user to be created",
        schema: {
          $ref: "#/components/schemas/User",
        },
      },
    ], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "User created successfully", // response desc
      },
      401: {
        description: "Unauthorized", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
