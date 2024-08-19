import {FormValidator} from "./src/formValidator.js"
import {review} from "./src/review.js";

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
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
        payload[key] = value;
    });

    try {
        const response = await review(payload);
        console.log('Review submitted successfully:', response);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
});