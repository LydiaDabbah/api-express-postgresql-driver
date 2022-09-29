const {Router}=require('express')
const router=Router();

router.get('/',(req,res)=>{ // utiliza el metodo de express que se llama get, y le decimos que cuando le haga una peticion get  a la ruta '/' ejecuta esa funcion
    console.log(req.body);
    res.json({message:'Hola, soy la respuesta'})
})

module.exports=router