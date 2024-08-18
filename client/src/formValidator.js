"use strict";

export class FormValidator {

    validators = [];
    errors = [];

    constructor(form) {
        this.form = form;
        this.form.addEventListener('submit', (event) => this.onSubmit(event))
    }

    addValidator(validator) {
        const field = this.form.elements[validator.name];
        if (!field) {
            console.warn(`Field "${validator.name}" not found in the form`);
            return;
        }

        this.validators.push({
            ...validator,
            field: this.form.elements[validator.name]
        })
    }

    validate() {
        this.errors = [];
        this.validators.forEach(validator => {

            if (this.errors.find(error => error.name === validator.name)) {
                return
            }

            if (!validator.method(validator.field)) {
                this.errors.push(validator);
            }
        })
        return this.errors.length === 0;
    }

    onSubmit(event) {
        // this.resetSummary()  -> ⚠️ uitbreiding voor thuis
        this.removeInlineErrors()

        if (!this.validate()) {
            event.preventDefault();
        }
        event.stopImmediatePropagation();

        // this.showSummary()   -> ⚠️ uitbreiding voor thuis
        this.showInlineErrors()
    }

    createInlineError(error) {
        const span = document.createElement('span');
        span.classList.add('field-error');
        span.innerText = error.message;
        span.id = error.name + "--error";
        return span
    }

    showInlineErrors() {
        this.errors.forEach(error => {

            const errorElement = this.createInlineError(error);

            if (error.field instanceof Node) {
                error.field.classList.add('invalid');
                error.field.setAttribute('aria-invalid', 'true')
                error.field.labels[0].appendChild(errorElement)
            } else if (error.field instanceof NodeList) {
                error.field.forEach(node => {
                    node.classList.add('invalid');
                    node.setAttribute('aria-describedby', errorElement.id); // Corrected line
                    node.setAttribute('aria-invalid', 'true'); // Corrected line
                });

                const fieldset = error.field[0].closest('fieldset');
                const legend = fieldset?.querySelector('legend');
                if (legend) {
                    legend.appendChild(errorElement)
                }
            }
        })
    }

    removeInlineErrors() {

        this.form.querySelectorAll('.field-error').forEach(element => element.remove());

        this.form.querySelectorAll('.invalid').forEach(element => {
            element.removeAttribute('aria-invalid');
            element.removeAttribute('aria-describedby');
            element.classList.remove('invalid');
        });
    }
}

const form = document.querySelector('#downloadForm');
if (!form) {
    console.warn('form is undefined!')
}

const formValidator = new FormValidator(form);

formValidator.addValidator({
    name: 'firstname',
    method: field => field.value.trim().length > 0,
    message: 'Voornaam is een verplicht veld en werd niet ingevuld'
})

formValidator.addValidator({
    name: 'name',
    method: field => field.value.trim().length > 0,
    message: 'Naam is een verplicht veld en werd niet ingevuld'
})

formValidator.addValidator({
    name: 'gender',
    method: field => field && field.value !== '',
    message: 'Geslacht is een verplicht veld en werd niet ingevuld'
});

formValidator.addValidator({
    name: 'email',
    method: field => field.value.trim().match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    message: 'E-mail voldoet niet aan het opgegeven patroon'
})

formValidator.addValidator({
    name: 'zipcode',
    method: field => field.value.trim().match(/^\d{4}$/),
    message: 'Postcode moet uit exact 4 cijfers bestaan'
})

formValidator.addValidator({
    name: 'privacy',
    method: field => field.value.trim().length > 0,
    message: 'Privacy is een verplicht veld'
})

form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Submit gelukt! Geen errors!');
    this.reset();
});

console.log(formValidator);
console.log(formValidator.validate())