const peopleElem = document.querySelector("#people");
const billElem = document.querySelector("#bill");
const submit = document.querySelector("[type=\"submit\"]");
const form = document.querySelector("form");
const tipPerPersonElem = document.querySelector("[data-tip-person]");
const totalPerPersonElem = document.querySelector("[data-total-person]");
const warning = document.querySelector(".warning")
const tipOptionsBtn = [...document.querySelectorAll("button[type=\"button\"]")];
const custom = document.getElementById("custom");
const tipOptions = [...tipOptionsBtn, custom];

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

tipOptionsBtn.forEach(option => {
    option.addEventListener("click", () => {
        tipOptions.forEach(optionBtn => optionBtn !== option ? optionBtn.classList.remove("active") : option.classList.toggle("active"));
        custom.value = "";
    })
})

custom.addEventListener("focus", () => {
    tipOptionsBtn.forEach(option => option.classList.remove("active"));
    custom.classList.add("active");
})
custom.addEventListener("blur", () => {
    if (!custom.value) custom.classList.remove("active")
})

form.addEventListener("submit", event => {
    event.preventDefault();
    if (submit.hasAttribute("disbaled")) return "disabled";
    checkInputForError(peopleElem, true);
    checkInputForError(billElem, false);
    if (billError || peopleError) return 
    const tipCalculator = new TipCalc();
    const tip = tipCalculator.getTipPerPerson();
    const total = tipCalculator.getTotalPerPerson();
    const formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD", signDisplay: "never"});
    tipPerPersonElem.innerText = !(isNaN(formatter.format(tip))) && isFinite(formatter.format(tip)) ? formatter.format(tip) : 0;
    totalPerPersonElem.innerText = !(isNaN(formatter.format(total))) && isFinite(formatter.format(total)) ? formatter.format(total) : 0;
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
    checkInputForError(peopleElem, true)
});
billElem.addEventListener("keyup", () => {
    checkInputForError(billElem, false);
});

function checkInputForError(input, showError) {
    const value = parseFloat(input.value.trim()) || 0;
    if ( !value || isNaN(value) || value < 1) {
        if (showError) warning.style.display = "inline";
        input.classList.add("error");
        if (input = peopleElem) peopleError = true;
        if (input = billElem) billError = true;
    } else if (!isNaN(value) || value > 0)  {
        if (showError) warning.style.display = "none";   
        input.classList.remove("error");
        input.classList.add("correct");
        if (input = peopleElem) peopleError = false;
        if (input = billElem) billError = false;
    }
    if (!peopleError && !billError && Number(billElem.value) && Number(peopleElem.value)) submit.removeAttribute("disabled");
    if (billError || peopleError) submit.setAttribute("disabled", "");
}

function reset(submit = false) {
    const tipPerPersonElem = document.querySelector("[data-tip-person]");
    const totalPerPersonElem = document.querySelector("[data-total-person]");
    tipPerPersonElem.innerText = "";
    totalPerPersonElem.innerText = "";
    tipOptions.forEach(option => option.classList.remove("active"));
    document.querySelectorAll("input").forEach(input => {   
        input.classList.remove("correct");
        input.classList.remove("error");
        input.value = "";
    })
    warning.style.display = "none";
}