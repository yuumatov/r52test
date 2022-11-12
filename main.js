const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
const body = document.body;
const btnModal = document.getElementById('btnModal');
const btnModalClose = document.getElementById('btnModalClose');
const modal = document.getElementById('modal');
const url = 'https://yuumatov.ru/r52test/test.php';

document.onclick = function (event) {
  if (event.target.id == 'btnMenu') {
    menu.classList.add('active');
    body.classList.add('disabled');
  } else if (event.target.id == 'btnModal') {
    modal.classList.add('active');
    body.classList.add('disabled');
  } else if (event.target.id == 'btnModalClose') {
    modal.classList.remove('active');
    body.classList.remove('disabled');
  } else if (!event.target.closest('#menu') && !event.target.closest('.modal__container')) {
    menu.classList.remove('active');
    modal.classList.remove('active');
    body.classList.remove('disabled');
  }
};

window.addEventListener('resize', function() {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    body.classList.remove('disabled');
  }
});

const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let errors = document.querySelectorAll('.error');
  errors.forEach(function(error) {
    error.innerHTML = '';
  });
  
  let email = form.email;
  let phone = form.phone;
  let age = form.age;
  let ageValide = false;

  let reEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  let rePhone = /^((7|8|\+7)[\- ]?)?(\(?\d{3,5}\)?[\- ]?)?[\d\- ]{5,15}$/;

  if (!reEmail.test(email.value)) {
    ErroeView(email, 'The email address is entered incorrectly');
  }

  if (!rePhone.test(phone.value)) {
    ErroeView(phone, 'The phone number is entered incorrectly');
  }

  if (document.querySelector('input[id="sex-m"]').checked) {
    if (age.value < 18 || age.value > 65) {
      ErroeView(age, 'The age must be from 18 to 65');
    } else {
      ageValide = true;
    }
  } else {
    ageValide = true;
  }

  if (reEmail.test(email.value) && rePhone.test(phone.value) && ageValide == true) {
    let query;
    $.ajax({
      type: "GET",
      url: url,
      beforeSend: function() {
        query = new URL(this.url).search;
      },
      data: {
        email: email.value,
        phone: phone.value,
        age: age.value,
        query: query
      },
      success: function() {
        form.innerHTML = 'Успешно отправлено!';
        window.setTimeout(function() {
          modal.classList.remove('active');
          body.classList.remove('disabled');
        }, 3000);
        console.log({
          email: email.value,
          phone: phone.value,
          age: age.value,
          query: query
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

});

function ErroeView(target, messege) {
  target.nextElementSibling.innerHTML = messege;
}