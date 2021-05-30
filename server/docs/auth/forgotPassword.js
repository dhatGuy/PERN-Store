module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Forgot password", // short desc
    summary: "Retrieve password",
    operationId: "forgotPassword", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties:{
              email:{
                type: "string",
              }
            }
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
      400: {
        description: "Email not found", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
