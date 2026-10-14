const express = require("express") 
const mongoose = require("mongoose"); 
const Book = require("./models/Book") 

const PORT = 5000;

const app = express() 
app.use(express.json()) 


mongoose.connect("mongodb://localhost:27017/books").then(() => {
    console.log("Успешное подключение к базе данных"); 
}).catch((error) => {
    console.log("Ошибка при подключении к БД:" + error); 
})





// GET /books — получить все книги
app.get("/books",async(req , res)=>{
    try{
        const books = await Book.find()
        res.json(books)
    }catch(error){
        res.send("Ошибкак при получении книги:" + error)
    }
})

// GET /books — получить все книги
app.get("/book/:id",async(req , res)=>{
    try{
        const { id } = req.params
        const book = await Book.find(id)
        res.json(book)
    }catch(error){
        res.send("Ошибкак при получении книги:" + error)
    }
})

//POST /addbook - добавить новую книгу
app.post("/addbook",async(req,res)=>{
    const {title , description, price} = req.body
    try{
        const newBook = await Book.create({
            title,description,price
        })
        await newBook.save()
        res.send("Книга добавлена успешно!")
    }catch(error){
        console.log("Ошибка при добавлении книги!" + error);
        res.send("Ошибка при добавлении книги!")
        
    }
});


// PUT /book/:id — полная замена товара по id
app.put("/book/:id",async (req,res) => {
     try{
        const{ id }= req.params
        const { title, description, price } = req.body
        const updateBook = await Book.findByIdAndUpdate(id, {
            title, description,price},
        {new: true} )
        if(!updateBook){
            res.json("Такой книги не сущетсвует!")
        }
        res.json(updateBook,"Книга успешно заменена!")
     }catch(error){
        res.send("Ошибка при изменении книги: "+ error)
     }
})







// PATCH /book/:id — частичное обновление товара по id
app.patch("/book/:id", async (req, res)=>{
    try{
        const{ id } = req.params
        const updateBook = await Book.findByIdAndUpdate(id,{
            $set: req.body},{new: true})

            if(!updateBook){
                res.json("Такой книги не существует!")
            }
            res.json(updateBook,"Книга успешно изменена!")
    }catch(error){
        res.send("Ошибка при изменении книги: " + error)
    }
})







// DELETE /book/:id — удалить товар по id

app.delete("/book/:id", async (req, res) => {
    try {
        const { id } = req.params 
        const book = await Book.findByIdAndDelete(id) 
        if (!book) { 
            res.send("Такого товара не существует") 
        }
        res.send("Товар успешно удален") 
    } catch (error) {
        res.send("Ошибка при удалении товара:" + error) 
    }
})









// запуск сервера на порту PORT
app.listen(PORT, () => {
    console.log("Успешное подключение к серверу:" + PORT); 
})