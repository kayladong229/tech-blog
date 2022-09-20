/* eslint-disable no-undef */
const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document
    .querySelector('#username-input-signup')
    .value.trim();
  const password = document
    .querySelector('#password-input-signup')
    .value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Unable to sign up.');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
