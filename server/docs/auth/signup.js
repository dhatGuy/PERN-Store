module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Create an account", // short desc
    summary: "Signup",
    operationId: "signup", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SignupInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Signup successful", // response desc
      },
      401: {
        description: "Input error", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
