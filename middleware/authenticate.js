export default function (req,res,next){
    if(req.session.auth)
    {
        next();
    }
    else{
        res.status(401);
        res.json({message:"You are not authorized"});
    }
}