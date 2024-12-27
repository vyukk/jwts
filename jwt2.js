const express = require ('express');
const jwt = require ('jsonwebtoken');
const app = express();
const JWT_2SECRET = "imfucked";

app.use(express.json());

const users =[];

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    users.push({
        username: username,
        password: password
    })
    res.send({
        message: "you have signed up"
    })
})

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const findUser = users.find((u) => u.username === username);
    if(findUser){
        if(findUser.password === password){
            const token = jwt.sign({username},JWT_2SECRET)
        res.json({
            token: token
        })}
    }
    else{
        res.json({
            messange: "incorrect login cridentials"
        })
    }
    
    
})
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_2SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get("/me", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})
/*
app.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            message: "Authorization token is required"
        });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decodedDATA = jwt.verify(token, JWT_2SECRET);

        const username = decodedDATA.username; // Extract username from the token
        const findUser = users.find((u) => u.username === username);

        if (findUser) {
            return res.json({
                username: findUser.username
            });
        } else {
            return res.status(404).send({
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(401).send({
            message: "Invalid or expired token"
        });
    }
});

*/

app.listen(4000,()=>{
    console.log("server is running on port 4000");
})