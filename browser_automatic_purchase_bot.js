const BUY_BUTTON_TIMEOUT = 3;
const CONFIRM_BUTTON_TIMEOUT = 3;
const MAX_CONTENT_LENGTH_IN_BLOCK = 25;

// [Client Scripts] //

// First step ===> find Buy Button
let isBuyClicked = false;
// Second step ===> Submit or Confirm, pick one of two
let isConfirmClicked = false;

let isOutputTipMsg =  false; //log tip msg

var start = new Date().getTime();


// Defines document root, body as default
const appRoot = () => {
    return document.getElementsByTagName('body')[0];
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

// Defines main function for monitoring presence of buttons on the page
const runWatchDog = (timeout = 0) => {

    if(!isOutputTipMsg){
        console.warn('robot is working. cycle timeout interval is' + " " + timeout + " millisecond.");
        console.warn('Close the current browser window if you want to stop running the robot');
        isOutputTipMsg =  true;
        start = new Date().getTime();
    }

    if(checkBuyButton() && !isBuyClicked) {
        console.warn('Clicked "Buy"');
        checkBuyButton().focus();
        setTimeout(() => checkBuyButton().click(), BUY_BUTTON_TIMEOUT);
        isBuyClicked = true
    }

    if(checkConfirmButton() && isBuyClicked && !isConfirmClicked) {
        console.warn('Clicked "Confirm"');
        checkConfirmButton().focus();
        setTimeout(() => checkConfirmButton().click(), CONFIRM_BUTTON_TIMEOUT);
        isConfirmClicked = true
    }

    if (isBuyClicked && isConfirmClicked){
        console.warn('🎉 Congratulations, you have successfully snapped up.');
        console.warn('The robot has exited.');
        var end = new Date().getTime();
        let offset = end - start
        console.log("cost is " + offset + " millisecond.")
        return
    }

    if (!isBuyClicked || !isConfirmClicked) {
        setTimeout(runWatchDog, timeout);
    }

}