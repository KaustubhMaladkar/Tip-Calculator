# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users can:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

Desktop Layout Screenshot
![image](https://user-images.githubusercontent.com/74300302/172127385-98121416-737f-4459-9ce4-306bd8d0d2db.png)

Mobile Layout Screenshot
![image](https://user-images.githubusercontent.com/74300302/172417355-feed3921-cbda-4a95-b31a-daa62cc1b261.png)



### Links

- Solution URL [(https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX/hub/tip-calculator-using-javascript-classes-css-flexbox-and-semantic-html-UKGFFSAs2F)]
- Live Site URL: [(https://kaustubhmaladkar.github.io/Tip-Calculator/)]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

```css
input::placeholder {
  color: black;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type=number] {
    -moz-appearance: textfield;
}
element {
  transition: background 0.7s ease-in-out;
}
element {
  background-position: left center;
}
```
```js
const formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD", signDisplay: "never"});
fomratter.format(number);
```

### Continued development

Responsive Design
Number Formatting using JavaScript

### Useful resources

- [Number Formatting using Intl.Number Format in JS]([https://www.example.com](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)) - This helped me understand how to format numbers

## Author

- Website - [Kaustubh Maladkar](https://www.your-site.com)
- Frontend Mentor - [kaustubhmaladkar](https://www.frontendmentor.io/profile/KaustubhMaladkar)
