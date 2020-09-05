module.exports.home = function (req, res) {
  try {
    console.log('hey');
    return res.render('home', {
      title: 'Dheeraj',
    });
  } catch (err) {}
};
