import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

const { form, email, textarea } = refs;

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormTextContent, 500));

populateFormTextContent();

function onFormSubmit(e) {
  e.preventDefault();

  if (email.value === '' || textarea.value === '') {
    return alert('Please fill in all the fields!');
  }

  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function onFormTextContent(e) {
  formData[e.target.name] = e.target.value;
  // console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormTextContent() {
  const savedInfo = localStorage.getItem(STORAGE_KEY);
  // console.log(savedInfo);
  if (savedInfo) {
    // console.log(savedInfo);
    formData = JSON.parse(savedInfo);

    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
}
