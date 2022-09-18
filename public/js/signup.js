/* eslint-disable no-undef */
const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
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
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
