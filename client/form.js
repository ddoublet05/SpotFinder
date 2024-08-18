import {FormValidator} from "./src/formValidator.js"

const form = document.querySelector("#downloadForm");

const formValidator = new FormValidator(form);

formValidator.addValidator({
    name: 'review',
    method: field => field && field.value !== '',
    message: 'Review is een verplicht veld en werd niet ingevuld'
});

formValidator.addValidator({
    name: 'parking',
    method: field => field && field.value !== '',
    message: 'Parking is een verplicht veld en werd niet ingevuld'
});