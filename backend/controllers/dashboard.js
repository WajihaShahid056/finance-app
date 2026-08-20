const {totalIncome,totalExpense,totalBudget,recentTransactions } = require("../models/dashboard")
async function dashboardDisplay(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ message: "session expired.please login again" });
    }
    const id = req.session.user.id;
    try {
        const Income = await totalIncome(id);
        const Expense = await totalExpense(id);
        const Budget = await totalBudget(id);
        const Transactions = await recentTransactions(id);

        return res.status(200).json({
            Income,
            Expense,
            Budget,
            Transactions
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });

    }
};
module.exports = {
    dashboardDisplay
}