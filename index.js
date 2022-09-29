const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    console.log('hola mundo')
})
app.listen(3000,(error)=>{
    error?console.log(error):console.log('Server running')
})// me pide un puerto y una funcion por si hay error
