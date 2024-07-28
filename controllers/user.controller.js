
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

//Delete Account
const deleteAccount = async(req,res)=>{
    try{
        await Users.destroy({where:{id:req.session.user.id}});
        req.session.destroy();
        res.json({message:"Account Deleted"})
    }
    catch(e){
        res.status(500).json({
            // message:"Something went wrong"
            message:e.message
        })
    }
}

//login User
const login = async (req, res) => {
    if(req.session.auth){
        res.status(400);
        res.json({ message: "You are already logged in" });
        return;
    }
    const { email, password } = req.body;

    try {
        const user = (await Users.findOne({ where: { email } })).dataValues;
        if (user.password === password) {
            req.session.auth = true;
            req.session.user = { email, id: user.id };
            res.json({ message: "Loggin complete" });
        }
        else {
            req.session.auth = false;
            res.status(400);
            res.json({ message: "Wrong Password" })
        }
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    }


}


export {
    createUser,
}