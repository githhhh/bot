const shouldClickMax = false; // Should we buy max amount of NFT clicking to "Max" button
const shouldClickConfirm = true; // Should we buy Confirm clicking to "Confirm" button
const MAX_BUTTON_TIMEOUT = 5;
const BUY_BUTTON_TIMEOUT = 6;
const SUBMIT_BUTTON_TIMEOUT = 8;
const CONFIRM_BUTTON_TIMEOUT = 8;
const MAX_CONTENT_LENGTH_IN_BLOCK = 25;

// [Client Scripts] //

// Whether to enable the maximum purchase
let isMaxClicked = false;
// First step ===> find Buy Button
let isBuyClicked = false;
// Second step ===> Submit or Confirm, pick one of two
let isConfirmClicked = false;
let isSubmitClicked = true; //ignore.


let isOutputTipMsg =  false //log tip msg

// Defines document root, body as default
const appRoot = () => {
    return document.getElementsByTagName('body')[0];
}

// Defines function for checking Max Button
const checkMaxButton = () => {
    const searchLabel = `Max`;

    const divs = appRoot().getElementsByTagName('div');

    for (let i = 0; i < divs.length; i++) {
        if(divs[i].textContent.length < MAX_CONTENT_LENGTH_IN_BLOCK && divs[i].textContent.includes(searchLabel)) {
            return divs[i].lastElementChild.lastElementChild;
        }
    }

    return false
}

// Defines common function for checking button with custom inner text value
const checkButton = (label) => {
    const searchLabel = label;

    const buttons = appRoot().getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].textContent.toLowerCase().includes(searchLabel.toLowerCase())) {
            return buttons[i]
        }
    }

    return false
}

// Defines Confirm Button
const checkConfirmButton = (label) => {
    const searchLabel = label || `Confirm`;

    return checkButton(searchLabel);
}

// Defines Buy Button
const checkBuyButton = (label) => {
    const searchLabel = label || `Buy`;

    return checkButton(searchLabel);
}

// Defines Submit Button
const checkSubmitButton = (label) => {
    const searchLabel = label || `Submit`;

    return checkButton(searchLabel);
}

// Defines main function for monitoring presence of buttons on the page
const runWatchDog = (timeout = 0) => {

    if(!isOutputTipMsg){
        console.warn('robot is working. cycle timeout interval is' + " " + timeout + " millisecond.");
        console.warn('Close the current browser window if you want to stop running the robot');
        isOutputTipMsg =  true;
    }

    if(shouldClickMax && !isMaxClicked) {
        if (checkMaxButton() && !isMaxClicked) {
            console.warn('Clicked "Max"');
            checkMaxButton().focus();
            setTimeout(() => checkMaxButton().click(), MAX_BUTTON_TIMEOUT);
            isMaxClicked = true;
        }
    } else {
        isMaxClicked = true;
    }

    if(checkBuyButton() && isMaxClicked && !isBuyClicked) {
        console.warn('Clicked "Buy"');
        checkBuyButton().focus();
        setTimeout(() => checkBuyButton().click(), BUY_BUTTON_TIMEOUT);
        isBuyClicked = true
    }

    if(checkSubmitButton() && isMaxClicked && isBuyClicked && !isSubmitClicked) {
        console.warn('Clicked "Submit"');
        checkSubmitButton().focus();
        setTimeout(() => checkSubmitButton().click(), SUBMIT_BUTTON_TIMEOUT);
        isSubmitClicked = true
    }

    if(shouldClickConfirm && isMaxClicked && isBuyClicked && isSubmitClicked && !isConfirmClicked){
        if(checkConfirmButton() && isMaxClicked && isBuyClicked && isSubmitClicked && !isConfirmClicked) {
            console.warn('Clicked "Confirm"');
            checkConfirmButton().focus();
            setTimeout(() => checkConfirmButton().click(), CONFIRM_BUTTON_TIMEOUT);
            isConfirmClicked = true
        }
    }else{
        isConfirmClicked = true
    }

    if (isBuyClicked && isSubmitClicked  && isConfirmClicked){
        console.warn('Congratulations, you successfully grabbed it.');
        return
    }

    if (!isBuyClicked || !isSubmitClicked || !isConfirmClicked) {
        setTimeout(runWatchDog, timeout);
    }

}