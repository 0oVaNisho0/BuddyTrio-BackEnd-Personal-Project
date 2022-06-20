exports.getMe = async (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.user));

  res.json({ user });
};
