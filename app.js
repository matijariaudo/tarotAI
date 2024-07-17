const express = require('express');
const path = require('path');
const { openAI } = require('./openAI');

const app = express();
const PORT = 8000; 


// Middleware para parsear application/json
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.post('/tarot',async(req,res)=>{
  const {name,cards,question}= req.body;
  console.log("buscando")
  try {
    const rta=await openAI(name,cards,question)
    console.log(rta)
    res.status(200).json(rta);
  } catch (error) {
    res.status(400).json({error:"Not working"});
  }
})
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

