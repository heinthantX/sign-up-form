const signUpForm = document.getElementById('sign-up');
const termCheckBox = document.getElementById('term-checkbox');
const signUpBtn = document.getElementById('signup-btn');

termCheckBox.addEventListener('change', function (e) {
  if (termCheckBox.checked) {
    signUpBtn.disabled = false;
  } else {
    signUpBtn.disabled = true;
  }
});

signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const firstNameInput = e.target[0];
  const lastNameInput = e.target[1];

  const emailInput = e.target[2];
  const passwordInput = e.target[3];
  const confirmPasswordInput = e.target[4];

  const validateEmail = emailChecker(emailInput.value);
  const validatePassword = passwordChecker(passwordInput.value);
  const validateConfirmPassword = confirmPasswordChecker(
    passwordInput.value,
    confirmPasswordInput.value
  );
  const validateArray = [
    {
      isValidate: validateEmail,
      node: emailInput,
      msg: 'Invalid Email',
    },
    {
      isValidate: validatePassword,
      node: passwordInput,
      msg: 'Password should contain at least one capital letter, one number and 8 characters',
    },
    {
      isValidate: validateConfirmPassword,
      node: confirmPasswordInput,
      msg: "Those passwords didn't match",
    },
  ];

  if (validateArray.every((obj) => obj.isValidate === true)) {
    // continue validation
    firstNameInput.value = ''; // just for clear input after form submitted
    lastNameInput.value = ''; // just for clear input after form submitted

    validateArray.forEach((val) => {
      const parentNode = val.node.parentNode;
      parentNode.innerHTML = parentNode.innerHTML.replace(
        /<span.*?>.*?<\/span>/gi,
        ''
      );
    });

    if (
      window.confirm(
        `Are you sure you want to sign up with "${emailInput.value}"?`
      )
    ) {
      alert('Thank for using our app!');
    } else {
      alert('Ok! Please fill the form again.');
    }
  } else {
    validateArray.forEach((val) => {
      const parentNode = val.node.parentNode;
      parentNode.innerHTML = parentNode.innerHTML.replace(
        /<span.*?>.*?<\/span>/gi,
        ''
      );
      if (!val.isValidate) {
        parentNode.innerHTML += errorTmp(val.msg);
      }
    });
  }
});

function emailChecker(email) {
  return new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  ).test(email);
}

function passwordChecker(password) {
  return new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd].{8,}$').test(
    password
  );
}

function confirmPasswordChecker(password, confirmPassword) {
  if (!password) return true;
  return password === confirmPassword;
}

function errorTmp(msg) {
  return `<span class="text-red-600 text-xs leading-3 tracking-tight text-thin">${msg}</span>`;
}
