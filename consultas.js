const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DB
});

const postear = async(data) => {
    const SQLQuery = {
        text: "INSERT INTO posts (usuario, url, descripcion) VALUES ($1, $2, $3) RETURNING *;",
        values: data
    }
    try {
        const result = await pool.query(SQLQuery);
        return result
    } catch (error) {
        throw new Error(error);
    }
}

const traerPosts = async() => {
    const SQLQuery = {
        text: "SELECT * FROM posts"
    }
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const likePost = async(id) => {
    const SQLQuery = {
        text: "UPDATE posts SET likes = likes + 1 WHERE id=$1 RETURNING *;",
        values: id
    }
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {postear, traerPosts, likePost}