/*
  Copyright (C) 2019  Simone Martelli

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.

  Contact info:
  - email:  simone.martelli.98@gmail.com
*/

$(document).ready(function() {

  $("#signup").click(function() {
    $("#first").fadeOut("fast", function() {
      $("#second").fadeIn("fast");
    });
  });

  $("#signin").click(function() {
    $("#second").fadeOut("fast", function() {
      $("#first").fadeIn("fast");
    });
  });

  $('#btn-login').click(function() {
    Login.login();
  });

  $(document).keypress(function(e) {
    if(e.which == 13)
      Login.login();
  });

  $('#btn-signup').click(function() {
    Login.signup();
  });

});

/**
* Login App
*/
const Login = (function() {

  function login () {
    let email =  {
      el: $('#lg-email')
    };
    let password = {
      el: $('#lg-password')
    };
    if(validateLogin(email, password)) {
      let hash = getHash(password.val);
      API.login(email.val, hash).done(function(data) {
        SessionStorage.setToken(data.token);
        window.location.href = './index.html';
      }).fail(function(e) {
        API.logError(e);
      });
    } else {
      console.log('Login validation failed!');
    }
  }

  function signup() {
    let password = {
      el: $('#sg-password')
    };
    let email = {
      el: $('#sg-email')
    };
    if(validateSignup(password, email)) {
      let hash = getHash(password.val);
      API.signup(email.val, hash).done(function() {
        alert('Account creato con successo!');
        window.location.reload();
      }).fail(function(e) {
        API.logError(e);
      });
    } else {
      console.log('Signup validation failed!');
    }
  }

  function validateLogin(email, password) {
    return validateCommon(email, password);
  }

  function validateSignup(email, password) {
    return validateCommon(email, password);
  }

  function validateCommon(email, password) {
    let ok = true;
    let e = email.el.val();
    let p = password.el.val();
    if(e == "") {
      ok = false;
      email.el.addClass('error');
    } else {
      email.val = e;
    }
    if(p == "") {
      ok = false;
      password.el.addClass('error');
    } else {
      password.val = p;
    }
    return ok;
  }

  function getHash(text) {
    return sha3_512(text);
  }

  // public
  return {
    login: login,
    signup: signup
  };

})();
