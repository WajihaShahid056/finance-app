const { addData, getTransaction,updateUserTransaction,deleteUserTransaction } = require("../models/transaction");
async function addTransaction(req, res) {
    console.log(req.body);
    if (!req.session.user) {
        return res.status(401).json({message: "Session expired. Please login again" });
    }
    const id = req.session.user.id;
    const { type, amount, category, date, description } = req.body;
    if (!type || !amount || !category || !date || !description) {
        return res.status(400).json({ message: "all fields required" });
    };
    const add = await addData(id, type, amount, category, date, description);
    return res.status(200).json({ message: "transaction added successfully" });


};
async function showTransaction(req, res) {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "Session expired. Please login again" });
        }
        const id = req.session.user.id;
        const transaction = await getTransaction(id);
        return res.status(200).json(transaction);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
};
async function updateTransaction(req,res) {
    const id=req.params.id;
    console.log("Transaction ID:", req.params.id);
    const { type, amount, category, date, description } = req.body;
      if (!type || !amount || !category || !date || !description) {
        return res.status(400).json({ message: "all fields required" });
    };
     const update = await updateUserTransaction(id, type, amount, category, date, description);
    return res.status(200).json({ message: "transaction updated successfully" });
};
async function deleteTransaction(req, res) {
    try {
        if (!req.session.user) {
            return res.status(401).json({message: "Session expired. Please login again"});
        }
        const id = req.params.id;
        const del=await deleteUserTransaction(id);
        return res.status(200).json({ message: "Transaction deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error"
        });
    }
}
module.exports = {
    addTransaction,
    showTransaction,
    updateTransaction,
    deleteTransaction,
};