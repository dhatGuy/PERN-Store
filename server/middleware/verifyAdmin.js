module.exports = (req, res, next) => {
  const { roles } = req.user;
  if (roles && roles.includes("admin")) {
    req.user = {
      ...req.user,
      roles
    }
    return next();
  } else {
    return res.status(401).json({ message: "require admin role" });
  }
};
