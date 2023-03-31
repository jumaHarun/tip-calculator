import './style.css';

// dom elements
const tipAmount = document.getElementById('tipAmount');
const totalAmount = document.getElementById('totalAmount');
const tipBtns = document.querySelectorAll('button.tip-btn');

// tip calculator object
class TipCalculator {
    constructor(totalBill = 0, tipPercentage = 0, peopleNum = 1) {
        (this.totalBill = totalBill),
            (this.tipPercentage = tipPercentage),
            (this.peopleNum = peopleNum),
            (this.tipAmount = this.calculateTipAmount());
    }

    calculateTipAmount() {
        return (this.totalBill / 100) * this.tipPercentage;
    }

    calculateTipAmountPerPerson() {
        return (this.tipAmount / this.peopleNum).toLocaleString('en-Us', {
            style: 'currency',
            currency: 'USD',
        });
    }

    calculateTotalAmountPerPerson() {
        const grandTotal = (this.tipAmount + this.totalBill) / this.peopleNum;

        return grandTotal.toLocaleString('en-Us', {
            style: 'currency',
            currency: 'USD',
        });
    }
}

// variables
let totalBill;
let tipPercentage;
let peopleNum;

// event listeners
document.addEventListener('click', (e) => {
    handleBtnClick(e.target);
    splitter(totalBill, tipPercentage, peopleNum);
});

document.addEventListener('keyup', (e) => {
    handleInputChange(e.target);
    splitter(totalBill, tipPercentage, peopleNum);
});

// functions
function splitter(bill, percentage, people) {
    const tipCalculator = new TipCalculator(bill, percentage, people);

    tipAmount.textContent = tipCalculator.calculateTipAmountPerPerson();
    totalAmount.textContent = tipCalculator.calculateTotalAmountPerPerson();
}

function handleInputChange(target) {
    if (target.dataset.input) {
        const value = JSON.parse(target.value);

        if (target.dataset.input === 'bill') {
            totalBill = value;
        } else if (target.dataset.input === 'custom-tip') {
            tipPercentage = value;
        } else if (target.dataset.input === 'people-qty') {
            if (value === 0) {
                console.log('Number of people cannot be 0');
            } else if (value >= 1) {
                peopleNum = value;
            }
        }
    }
}

function handleBtnClick(target) {
    if (target.dataset.btn === 'tip') {
        tipPercentage = JSON.parse(target.value);
        removeSelectedClass(tipBtns);
        target.classList.add('selected');
    } else if (target.dataset.btn === 'reset') {
        reset();
    }
}

function removeSelectedClass(btnsList) {
    return btnsList.forEach((btn) => {
        if (btn.classList.contains('selected')) {
            return btn.classList.remove('selected');
        }
    });
}

function reset() {
    document.querySelector('#bill').value = '';
    document.querySelector('#custom-tip').value = '';
    document.querySelector('#people-qty').value = '';

    removeSelectedClass(tipBtns);
}
