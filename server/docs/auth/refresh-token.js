module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Get refresh token", // short desc
    summary: "Refresh Token",
    operationId: "refreshToken", // unique operation id
    parameters: [],
    security: [
      {
        cookie: [],
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "success", // response desc
        headers: {
          "set-cookie": {
            description: "`refreshToken`",
            schema: {
              type: "string",
              example:
                "refreshToken=0IjoxNjIyMzEzMjI4LCJleHAiOjE2MjIzMTY4Mjh9.LXKZmJW1mUyoHOsmhYdFni8mcEhON4dPAxAtSKoEqCo; Path=/; HttpOnly; Secure; SameSite=None",
            },
          },
          "auth-token": {
            description: "`accessToken`",
            schema: {
              type: "string",
              example:
                "0IjoxNjIyMzEzMjI4LCJleHAiOjE2MjIzMTY4Mjh9.LXKZmJW1mUyoHOsmhYdFni8mcEhON4dPAxAtSKoEqCo",
            },
          },
        },
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
