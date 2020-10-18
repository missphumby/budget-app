class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
        this.expenseItems = document.querySelector('#expense-item');
        // console.log(this.expenseItems)
    }


    submitBudgetForm() {
        const budgetValue = this.budgetInput.value;
        if (budgetValue === '' || budgetValue < 0) {
            this.budgetFeedback.classList.add('showItem')
            this.budgetFeedback.innerHTML = `<h3>value cannot be empty or negative</h3>`;
            const self = this;
            setTimeout(function () {
                self.budgetFeedback.classList.remove('showItem');
            }, 3000);
        } else {
            // this.budgetFeedback.classList.remove('showItem')
            this.budgetAmount.textContent = budgetValue;
            // this.balanceAmount.textContent = budgetValue;
            this.budgetInput.value = '';
            this.showBalance();
        }

        this.budgetFeedback.style.backgroundColor = "pink"
    }

    showBalance() {
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;


    };

     //total expense
     totalExpense() {
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce(function (acc, curr) {
                acc += curr.amount;
                return acc;
            }, 0)
        }
        this.expenseAmount.textContent = total;
        return total;
    }


    submitExpenseForm() {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value
        if (expenseValue === "" || amountValue === '' || amountValue < 0) {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<h3>value cannot be empty or negative</h3>`;
            const self = this;
            setTimeout(function () {
                self.expenseFeedback.classList.remove('showItem');
            }, 3000);
        } else {
            let amount = parseInt(amountValue);
            this.expenseInput.value = "";
            this.amountInput.value =  "";

            let expense ={
                id: this.itemID,
                title: expenseValue,
                amount: amount
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
        this.expenseFeedback.style.backgroundColor = "pink"

    };

     
    addExpense(expense) {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        const div = document.createElement("div");
        div.classList.add('expense');
        div.innerHTML = `<h6 class="expense-title list-item">${expense.title}</h6>
<h5 class="expense-amount list-item">$${expense.amount}</h5>
<div class="expense-icons list-item">
 <a href="#" class="edit-icon" data-id="${expense.id}">
  <i class="fa fa-edit"></i>
 </a>
 <a href="#" class="delete-icon" data-id="${expense.id}">
  <i class="fa fa-trash"></i>
 </a>
</div>`
        this.expenseItems.appendChild(div)
    }


    //edit expense
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement;
    //remove from DOM
    this.expenseItems.removeChild(parent);
    //remove from the list
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    })
    //show values
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    //remove from the list
    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    })
    this.itemList = tempList;
    this.showBalance();
  }



  //delete expense
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement
    //remove from DOM
    this.expenseItems.removeChild(parent);
    //remove from the list
    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    })
    this.itemList = tempList;
    this.showBalance();
  }



};


function eventListeners() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseItems = document.getElementById('expense-item');
    console.log(expenseItems);
    console.log(budgetForm);
    //new instance of UI Class
    const ui = new UI();

    //budget form submit
    budgetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.submitBudgetForm();
    });

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.submitExpenseForm();
        // ui.addExpense(expense);
    });
    expenseItems.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(e.target.parentElement)
        } else if (e.target.parentElement.classList.contains('edit-icon')) {
            ui.editExpense(e.target.parentElement);
            // ui.expenseInput.value === expenseValue[0]
            // ui.amountInput.value === amountValue[0]
        }

    })




}

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
})
