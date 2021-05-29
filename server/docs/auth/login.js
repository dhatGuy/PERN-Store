module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Create a login session", // short desc
    summary: "Login",
    operationId: "login", // unique operation id
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/LoginInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Login successful", // response desc
        headers: {
          "set-cookie": {
            description: "`refreshToken`",
            schema: {
              type: "string",
              example:
                "refreshToken=0IjoxNjIyMzEzMjI4LCJleHAiOjE2MjIzMTY4Mjh9.LXKZmJW1mUyoHOsmhYdFni8mcEhON4dPAxAtSKoEqCo; Path=/; HttpOnly; Secure; SameSite=None",
            },
          },
        },
      },
      403: {
        description: "Invalid login", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
