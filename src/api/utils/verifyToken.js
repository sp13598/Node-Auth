import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next)=> {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).send("You Are Not Authorized...");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err){
            return res.status(403).send("Invalid Token...")
        }
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else {
            return res.status(403).send("You Are Not Authorized...")
        }
    })
}

export const verifyAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next();
        }else {
            return res.status(403).send("You Are Not Authorized...")
        }
    })
}