const peopleElem = document.querySelector("#people");
const billElem = document.querySelector("#bill");
const submit = document.querySelector("[type=\"submit\"]");
const form = document.querySelector("form");
const tipPerPersonElem = document.querySelector("[data-tip-person]");
const totalPerPersonElem = document.querySelector("[data-total-person]");
let billError = peopleError = false;

class TipCalc {
    constructor () {
        this.tipPerPerson = 0;
        this.totalPerPerson = 0;
        this.tip = 0
        this.tipPercent = 0;
        this.bill = parseFloat(billElem.value);
        this.people = parseFloat(peopleElem.value);
    }

    getTip() {
        const element = document.querySelector(".active");
        if (!element) return 0;
        if (element.tagName === "BUTTON") return this.tipPercent = element.innerText.replace("%", "");
        return this.tipPercent =  element.value.replace("%", "");
    }

    getTipPerPerson() {
        this.getTip();
        this.tip =((this.tipPercent / 100) * this.bill);
        this.tipPerPerson = this.tip / this.people;
        return this.tipPerPerson;
    }

    getTotalPerPerson() {
        this.getTipPerPerson();
        this.totalPerPerson = (this.bill + this.tip) / this.people
        return this.totalPerPerson;
    }
}

const tipOptions = [...document.querySelectorAll("button[type=\"button\"]"), document.querySelector("#custom")];
tipOptions.forEach(option => {
        if (option.tagName === "INPUT") option.addEventListener("keyup", () => {
        tipOptions.forEach(option => option.classList.remove("active"));
        option.classList.toggle("active");
    })
    if (option.tagName === "BUTTON") option.addEventListener("click", () => {
        tipOptions.forEach(option => option.classList.remove("active"));
        option.classList.toggle("active");
    })
})

form.addEventListener("submit", event => {
    event.preventDefault();
    checkInputForError(peopleElem, peopleError, true);
    checkInputForError(billElem, billError, false);
    if (billError || peopleError) return;
    const tipCalculator = new TipCalc();
    const tip = isNaN(tipCalculator.getTipPerPerson()) ? 0 : tipCalculator.getTipPerPerson();
    const total = isNaN(tipCalculator.getTotalPerPerson()) ? 0 : tipCalculator.getTotalPerPerson();
    const formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD", signDisplay: "never"});
    tipPerPersonElem.innerText = formatter.format(tip);
    totalPerPersonElem.innerText = formatter.format(total);
    submit.style.display = "none";
    const resetBtn = document.querySelector("[type=\"reset\"]");
    resetBtn.style.display = "block";
    resetBtn.addEventListener("click", () => {
        reset()
        resetBtn.style.display = "none";
        submit.style.display = "block"; 
    })
})

document.addEventListener("DOMContentLoaded", () => {
    reset()
})

peopleElem.addEventListener("keyup", () => {
    checkInputForError(peopleElem, peopleError, true)
});
billElem.addEventListener("keyup", () => {
    checkInputForError(billElem, billError, false);
});

function checkInputForError(input, error, showError) {
    const value = input.value.trim() || 0;
    if (!value ||isNaN(parseFloat(value)) || parseFloat(value) == 0) {
        if (showError) document.querySelector(".warning").style.display = "inline";
        input.classList.add("error");
        error = true;
    } else {
        if (showError) document.querySelector(".warning").style.display = "none";   
        input.classList.remove("error");
        input.classList.add("correct");
        error = false;
    }
}

function reset(submit = false) {
    const tipPerPersonElem = document.querySelector("[data-tip-person]");
    const totalPerPersonElem = document.querySelector("[data-total-person]");
    tipPerPersonElem.innerText = "";
    totalPerPersonElem.innerText = "";
    console.log(tipPerPersonElem.innerText, totalPerPersonElem.innerText, "reset", submit);
    tipOptions.forEach(option => option.classList.remove("active"));
    document.querySelectorAll("input").forEach(input => {   
        input.classList.remove("correct");
        input.classList.remove("error");
        input.value = "";
    })
}