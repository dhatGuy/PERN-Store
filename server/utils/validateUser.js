const validateUser = (user) => {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" && user.password.trim().length >= 6;

  return validEmail && validPassword;
};

module.exports = validateUser;
