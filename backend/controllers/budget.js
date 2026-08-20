const budgetModel = require("../models/budget");

async function addBudget(req, res) {
    if (!req.session.user) {
        return res.status(401).json({message: "session expired.please login"});
    }
    const user_id = req.session.user.id;
    const { month, budget } = req.body;
    console.log(budget);
    
    if (!month || !budget) {
        return res.status(400).json({message: "month and budget are required"});
    }
    try {
        await budgetModel.addBudget(
            user_id,
            month,
            budget
        );
        res.status(200).json({ message: "budget saved successfully"});
    } catch (error) {
       if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({message: "budget for this month already exists.if you want to change budget you can delete it and add a new one."});
        };
    }
};
async function showBudget(req, res) {
    if (!req.session.user) {
        return res.status(401).json({message: "session expired.please login again"});
    }
    const id = req.session.user.id;
    try {
        const result = await budgetModel.showBudget(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
};
async function deleteUserBudget(req, res) {
    try {
        if (!req.session.user) {
            return res.status(401).json({message: "Session expired. Please login again"});
        }
        const id = req.params.id;
        const del=await budgetModel.deleteUserBudget(id);
        return res.status(200).json({ message: "budget deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error"
        });
    }
}
module.exports = {
    addBudget,
    showBudget,
    deleteUserBudget
};