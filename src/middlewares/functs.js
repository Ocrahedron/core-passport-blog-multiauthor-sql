exports.isAuth = (req, res, next) => {
  if (req.session?.user) next();
  else res.redirect('/login');
};

exports.isValid = (req, res, next) => {
  const { name, password } = req.body;
  if (name && password) next();
  else {
    res.status(401);
  }
};

// exports.isAuthPost = (req, res, next) => {
//   const entry = await Entry.findOne({ where: { id: req.params.id }, include: { model: User } });
//   await 
// };
