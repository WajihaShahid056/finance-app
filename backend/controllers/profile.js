const { getProfile, update } = require("../models/profile");
const bcrypt = require("bcrypt");
async function profileData(req, res) {
    try {

        const id = req.session.user.id;

        const profile = await getProfile(id);
        return res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}
async function updateProfile(req, res) {
    try {
        const id = req.session.user.id;
        console.log(id);

        const { name, email, password } = req.body;
        const img = req.file ? req.file.filename : null;
        if (!name || !email || !password || !img) {
            return res.status(400).json({ message: "all fileds required" })
        };

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await update(name, email, img, passwordHash, id);
        console.log(newUser);

        req.session.user = {
            id,
            email: email,
        }
        return res.status(200).json({ message: "profile updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });


    }
};
function logOut(req, res) {
    req.session.destroy(function (error) {
        console.log(error);
        if (error) {
            return res.status(500).json({ message: "logout failed" });
        } else {
            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "logout successful" });
        }
    });
}
module.exports = {
    profileData,
    updateProfile,
    logOut
};