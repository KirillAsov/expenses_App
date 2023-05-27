
const expenseValueNode = document.querySelector('[data-find="expenseValue"]');
const buttonAddNode = document.getElementById('buttonAdd');
const historyListNode = document.querySelector('[data-find="historyList"]');
const sumNode = document.querySelector('[data-find="sum"]');
const limitNode = document.querySelector('[data-find="limit"]');
const statusNode = document.querySelector('[data-find="status"]');
const categoryNode = document.getElementById('select');
const resetButton = document.getElementById('buttonReset')

const deleteExpenseBtn = document.getElementById('buttonDelete');

const POPUP_OPENED_CLASSNAME = 'popup__open';
const popupNode = document.getElementById('popup');
const popupContentNode = document.getElementById('popup_content');
// const editLimitNode = document.getElementById('edit_limit');
const editLimitBtnNode = document.getElementById('edit_limit_btn');
const popupCloseBtn = document.getElementById('buttonClose');
const inputLimitNode = document.getElementById('inputLimit');
const setLimitBtn = document.getElementById('setLimitBtn');



const SUM_INITIAL_VALUE = 0;
let LIMIT = 10000;
const CURRENCE = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_LIMIT = 'все плохо';
const STATUS_OUT_LIMIT_CLASSNAME = 'value-text__status__red';
limitNode.innerText = LIMIT;

let expenses = [];

editLimitBtnNode.addEventListener ('click', togglePopup);
popupCloseBtn.addEventListener ('click', togglePopup);
popupNode.addEventListener('click', (event) => {
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

    if (isClickOutsideContent) {
        togglePopup();
    }
})

function togglePopup () {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}


//Получение величины лимита от пользователя
const gettingLimit = () => parseInt(inputLimitNode.value);

setLimitBtn.addEventListener('click', setLimitBtnHandler);

function setLimitBtnHandler () {
    const newLimit = gettingLimit ();
    if (!newLimit) {
        return
    }
    LIMIT = newLimit;
    limitNode.innerText = LIMIT;
    togglePopup ();
    render ();
}

//Получение траты от пользователя
const gettingExpense = () => parseInt(expenseValueNode.value);

//Получение категории от пользователя
function gettingCategory () {
    return categoryNode.value;
}
//Очищение поля ввода
const inputClearing = (input) => {
    input.value = '';
};

//Получение суммы
const getTotal = () => {
    let sum = 0;
    expenses.forEach(function(expense) {
        sum += expense.amount;
    });
    return sum;
}

//отображение статуса, лимта
function renderStatus () {
    const total = getTotal (expenses);
    sumNode.innerText = total;

    if (total <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_LIMIT_CLASSNAME);
    }
    else {
        statusNode.innerText = `${STATUS_OUT_LIMIT} (${LIMIT - total}) ${CURRENCE}` ;
        statusNode.classList.toggle(STATUS_OUT_LIMIT_CLASSNAME);
    }
}

//изменение списка (истории)
function renderHistory () {
    historyListNode.innerHTML = "";

    expenses.forEach(function (expense) {
        const historyItem = document.createElement('li');

        historyItem.className = 'currency';

        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        historyListNode.appendChild(historyItem);
    })
}

function render () {
    renderStatus();
    renderHistory ();
}
const addButtonHandler =() => {
    const currentAmount = gettingExpense();
    if (!currentAmount) {
        return;
    }
    const currentCategory = gettingCategory ();
    if (currentCategory === 'Категория') {
        return
    }
    //Добавление в массив объектов (трата и категория)
    const newExpense = {amount: currentAmount, category: currentCategory}
    expenses.push(newExpense);
    
    
    inputClearing(expenseValueNode);
    render ();
}

function resetButtonHandler () {
    expenses = [];
    render ();
}
buttonAddNode.addEventListener('click', addButtonHandler);
resetButton.addEventListener('click', resetButtonHandler);


deleteExpenseBtn.addEventListener('click', deleteExpenseBtnHandler);

function deleteExpenseBtnHandler () {
    expenses.pop();
    render ();
}

























