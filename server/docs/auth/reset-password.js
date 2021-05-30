module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Reset password", // short desc
    summary: "Change password",
    operationId: "resetPassword", // unique operation id
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
              password: {
                type: "string",
              },
              password2: {
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
        description: "Password reset successful", // response desc
      },
      400: {
        description: "validation error", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
