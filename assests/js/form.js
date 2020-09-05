{
  const signUpForm = $('#sign-up-form');

  function validateForm(e) {
    e.preventDefault();

    const password = $(e).find('input:password');
    console.log(password);
  }

  function init() {
    $(signUpForm).submit(function (e) {
      e.preventDefault();
      let self = $(this);

      const passwords = $(e.target).find('input:password');
      if ($(passwords[0]).val() !== $(passwords[1]).val()) {
        alert('Passwords does not match');
      }

      $.ajax({
        type: 'post',
        url: $(self).attr('action'),
        data: $(self).serialize(),
        success: function (data) {
          console.log(data);
        },
        error: function (err) {},
      });
    });
  }

  init();
}
