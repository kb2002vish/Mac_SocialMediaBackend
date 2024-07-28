
import Friend from "../models/Friends.js";
import Users from "../models/Users.js";

//create User
const createUser = async (req, res) => {

    //If the user is already logged in the first must be logged out
    if(req.session.auth)
    {
        res.status(400);
        res.json({ message: "First Logout" })
        return;
    }
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        res.status(400);
        res.json({ message: "All information is required" })
        return;
    }
    try {
        await Users.create({ name, email, password })
    }
    catch (e) {
        res.status(400);
        res.json({ message: "Creation fail" })
        return;
    }

    res.status(201);
    res.json({ message: "User created successfuly" });

}



export {
    createUser,
}