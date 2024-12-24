const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'singlerhoaishkro:-)'

app.use(express.json());

const users = [];