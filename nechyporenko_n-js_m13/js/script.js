const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const tel = document.getElementById("tel");
const submitBtn = document.getElementById("submit-btn");
const resultsList = document.querySelector(".results");
let namesPattern = /^([A-Z]?[a-z]+\s?){1,3}$/;
let telPattern = /^\+{1}\d{3}\s{1}(\d{2}\s{1}){3}\d{3}$/;
let results;

submitBtn.addEventListener("click", validate, false);

function validate(evt) {
    results = {
        checkFirstname: namesPattern.test(firstname.value),
        checkLastname: namesPattern.test(lastname.value),
        checkTel: telPattern.test(tel.value)
    };
    evt.preventDefault();
    showResults(results);
};

function showResults(results) {
    let template = '';

    for (key in results) {
        if (results[key]) {
            template += `<li class="success">SUCCES: '${key}' passed validation</li>`;
        } else {
            template += `<li class="error">ERROR: '${key}' failed validation</li>`;
        };
    };

    resultsList.innerHTML = template;
};
