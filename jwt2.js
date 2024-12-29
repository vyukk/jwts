const express = require ('express');
const jwt = require ('jsonwebtoken');
const app = express();
const JWT_2SECRET = "imfucked";
 // Use the same secret


app.use(express.json());

const users =[];
function logger(req,res,next){
    console.log(req.method + " request came");
    next();
}

app.post('/signup',logger,(req,res)=>{
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



app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    // Dummy credentials check (replace with actual validation logic)
    if (username === "hi" && password === "password") {
        const token = jwt.sign({ username }, process.env.JWT_2SECRET || "imfucked", {
            expiresIn: "1h"  // 1 hour expiration time
        });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});


    

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Received Token:", authHeader); // Debug log

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];  // This splits the string 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    // Try to verify the token
    jwt.verify(token, process.env.JWT_2SECRET || "imfucked", (err, decoded) => {
        if (err) {
            console.error("JWT Error:", err);  // Debug log
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decoded;
        next();
    });
}





app.get("/me", auth, (req, res) => {
    const user = req.user;  // Access the user info from the decoded token
    console.log("Token from LocalStorage:", token);

    if (user) {
        res.send({ username: user.username });
    } else {
        res.status(400).send({ message: "User not found" });
    }
});

app.get("/",logger,(req,res)=>{
    res.sendFile(__dirname + "/public/index2.html");
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