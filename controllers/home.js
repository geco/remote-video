/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.redirect('/camera')
  /*res.render('home', {
    title: 'Home'
  });*/
};
