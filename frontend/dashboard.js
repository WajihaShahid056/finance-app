const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const budget = document.querySelector("#budget");
const transactionList = document.querySelector("#transaction-list");
async function dashboardShow() {
    try {
        const req = await fetch("/dashboard", {
            method: "GET"
        });
        if (req.status === 401) {
            const data = await req.json();
            alert(data.message);
            window.location.href = "./login.html";
            return;
        }
        const data = await req.json();
        console.log(data);
        income.textContent = "Total income: Rs " + data.Income;
        expense.textContent = "Total expense: Rs " + data.Expense;
        budget.textContent = "Current budget: Rs " + data.Budget;
        data.Transactions.forEach(transaction => {
            const li = document.createElement("li");
            li.textContent =transaction.type +" - Rs " +transaction.amount +" - " +transaction.category +" - " +transaction.date;
            transactionList.appendChild(li);
        });
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}
dashboardShow();