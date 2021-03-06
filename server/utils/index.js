const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);
const verifygoogleIdToken = async token => {
  return await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
}

module.exports ={
  verifygoogleIdToken
}
