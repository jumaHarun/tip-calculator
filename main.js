import './style.css';

// dom elements
const tipAmount = document.getElementById('tipAmount');
const totalAmount = document.getElementById('totalAmount');
const tipBtns = document.querySelectorAll('button.tip-btn');
const outlinedEls = document.querySelectorAll('.outline');
const modal = document.querySelector('.modal');

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
        return this.tipAmount / this.peopleNum;
    }

    calculateTotalAmountPerPerson() {
        const grandTotal = (this.tipAmount + this.totalBill) / this.peopleNum;

        return grandTotal;
    }
}

// variables
let totalBill;
let tipPercentage;
let peopleNum;

// event listeners
document.addEventListener('click', (e) => {
    handleBtnClick(e.target);
    calculator(totalBill, tipPercentage, peopleNum);
});

document.addEventListener('input', (e) => {
    handleInputChange(e.target);
    calculator(totalBill, tipPercentage, peopleNum);
});

document.addEventListener('mousedown', (e) => {
    handleInputFocus(e.target);
});

// functions
function calculator(bill, percentage, people) {
    const tipCalculator = new TipCalculator(bill, percentage, people);
    const tip = tipCalculator.calculateTipAmountPerPerson();
    const total = tipCalculator.calculateTotalAmountPerPerson();

    render(tip, total);
}

function handleInputChange(target) {
    if (target.dataset.input) {
        const value = target.value > 0 && Number(target.value);

        if (target.dataset.input === 'bill') {
            totalBill = value;
        } else if (target.dataset.input === 'custom-tip') {
            tipPercentage = value;
        } else if (target.dataset.input === 'people-qty') {
            if (value == 0) {
                modal.style.display = 'initial';
            } else if (value >= 1) {
                modal.style.display = 'none';
                peopleNum = value;
            }
        }
    }
}

function handleBtnClick(target) {
    if (target.dataset.btn === 'tip') {
        tipPercentage = Number(target.value);
        removeSelectedClass(tipBtns);
        target.classList.add('selected');
    } else if (target.dataset.btn === 'reset') {
        reset();
    }
}

function handleInputFocus(target) {
    outlinedEls.forEach((el) => {
        el.classList.remove('inp-active');
    });

    if (target.dataset.input === 'custom-tip') {
        target.classList.add('inp-active');
    } else if (
        target.dataset.input === 'bill' ||
        target.dataset.input === 'people-qty'
    ) {
        target.parentElement.classList.add('inp-active');
    }
}

function removeSelectedClass(btnsList) {
    return btnsList.forEach((btn) => {
        if (btn.classList.contains('selected')) {
            return btn.classList.remove('selected');
        }
    });
}

function render(tip = 0, total = 0) {
    tipAmount.textContent = tip.toLocaleString('en-Us', {
        style: 'currency',
        currency: 'USD',
    });

    totalAmount.textContent = total.toLocaleString('en-Us', {
        style: 'currency',
        currency: 'USD',
    });
}

render();

function reset() {
    document.querySelector('#bill').value = '';
    document.querySelector('#custom-tip').value = '';
    document.querySelector('#people-qty').value = '';

    totalBill = 0;
    tipPercentage = 0;

    removeSelectedClass(tipBtns);

    render();
}
