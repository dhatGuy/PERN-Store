module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Verify password reset token", // short desc
    summary: "Verify password reset token",
    operationId: "checkToken", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
              email: {
                type: "string",
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
        description: "Success", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
