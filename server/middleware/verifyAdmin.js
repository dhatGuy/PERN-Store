module.exports = verifyAdmin = (req, res, next) => {
  const { roles } = req.user;
  if (roles && roles.includes("admin")) {
    return next();
  } else {
    return res.status(401).json({ message: "require admin role" });
  }
};
