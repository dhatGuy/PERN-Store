module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Create a login via Google", // short desc
    summary: "Login with with Google",
    operationId: "googleLogin", // unique operation id
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
                example:
                  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MTllYjk1N2Y2OTU2YjU4MThjMTk2OGZm.zNzQ2MTY3NzItZGQ0bW05Z2FtYW02Z21NjQxMTAxNDYyMDgzMzURydWUsImF0X2hhc2giOiJZbUd5bm5nS05RVjA0ZmU0YkJfV0FBIiwibmFtZSI6Ikpvc2VwaCBPZHVuc2kiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lFSTRQNlRTZF9URmtsLV83MWNySHVxcm1rQXM2bG9ZV2U1b1NsMW9vPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikpvc2VwaCIsImZhbWlseV9uYW1lIjoiT2R1bnNpIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE2MjIzOTMyNTYsImV4cCI6MTYyMjM5Njg1NiwianRpIjoiZDI0OWIzYzEzMGMxNjY2ZmQxMTYyNDU5Y2RlYTdiMGQ2MGQwODA3NSJ9.i22B4sDzegdSq1-CJ0FW9wRuTCvNHMBNrLHcEEfLZwZWVERhTpCJvoPkFdmSZWu8FQSY_q0IjDPT8UgDjNfHxZtGVGyva7CblrZUZRuWRtyJeSh9_xnW563suSEEGp7E-L8JXXjmoaQubiofeKIkT_Q1SYYm_MRNyWZpVjJ8wcEybWHBRs_XzbB4UFQNM31_96bbW8MvvVZmLnUDCeUMVHSs1dWJvbkW-ICVs4bMojOqWnXXWsDyELbmfmXNMCyYjBwt_yHKn5_L_PThKQ1ykAIt7dE6pDVoRe54V0WijPC1R7MT96TgwKZWfaXjMrlJ4o75CO7qoyCsPSI9KyH0Sg",
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
