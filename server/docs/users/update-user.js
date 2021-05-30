module.exports = {
  // operation's method
  put: {
    tags: ["Users"], // operation's tag
    description: "Update user", // short desc
    summary: "Update a user",
    operationId: "updateUser", // unique operation id
    security: [
      {
        JWT: [],
      },
    ],
    parameters: [
      // expected params
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/id", // id model
        },
        required: true, // mandatory
        description: "Id of user to be updated", // short desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "User updated successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // user data model
            },
          },
        },
      },
      // response code
      403: {
        description: "Data exists already", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // user data model
            },
          },
        },
      },
      // response code
      500: {
        description: "Server error", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // user data model
            },
          },
        },
      },
    },
  },
};
