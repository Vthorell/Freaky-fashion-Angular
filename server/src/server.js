import express from "express";

const port = 8000;

const app = express();

app.get("/api/products", (req, res) => {
    res.json(products);
})

app.listen(port, () => {
    console.log(`lyssnar på port ${port}`);
});