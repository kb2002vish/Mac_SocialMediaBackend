
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

//Log out
const logOut = (req,res)=>{
    req.session.destroy();
    res.json({message:"Logout Successful"});
}

//Add Friends
const addFriend = async (req, res) => {
    const { id } = req.params;
    const sessionUserId = req.session.user.id;
    if (id == sessionUserId) {
        res.status(400).json({ message: "Self friend request" });
        return;
    }
    try {
        const user = await Users.findOne({ where: { id } });

        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        //if already friend request send

        const isRequest = await Friend.findOne({ where: {user1:sessionUserId, user2:id}})

        if(isRequest) {
            res.status(400).json({ message: "Friend request already sent" });
            return;
        }

        //1 side
        const friend = await Friend.create({user1:sessionUserId, user2:id});
      
        
        if (friend) {
            res.json({ message: "Friend request sent successfully" });
        }
        else{
            res.status(400).json({ message: "Failed to send friend request" });
        }
        
    }
    catch (e) {
        res.json({ message: e.message })
    }
}

// All Friend requests
const friendRequests = async (req, res) => {
    try {
        const requests = await Friend.findOne({ where: { user2: req.session.user.id, state: false } });
        
        if (!requests)
            return res.status(200).json({ message: "No Requests" })

        res.json(requests);
    }
    catch (e) {
        res.status(400);
        res.json({ message: e.message })
    }
}

//Accepting the friend request
const acceptRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const isRequest = await Friend.findOne({
            where:{user2:req.session.user.id, user1:id, state:false}
        });
        if (!isRequest) {
            res.status(400).json({ message: "No such request" });
            return;
        }

        //if accepted then the requester become the friend and of the seesion user

        await Friend.create({
            user1: req.session.user.id,
            user2: id, 
            state: true
        });

        isRequest.state = true;
        await isRequest.save();
        res.json({ message: "Request accepted" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}
export {
    createUser,
}