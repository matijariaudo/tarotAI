const express = require('express');
const path = require('path');
const fs=require('fs')
const { openAI } = require('./openAI');
const { tarotAI } = require('./tarotAI');

const app = express();
const PORT = 8000; 


// Middleware para parsear application/json
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Carpeta de vistas
// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const language = req.headers['accept-language'];
  let lang = language.split(',')[0].split('-')[0]; // Obtén el código de idioma, como 'es', 'en'
  console.log(lang)
  // Redirige según el idioma detectado
  switch (lang) {
    case 'es':
      return res.redirect('/es');
    case 'en':
      return res.redirect('/en');
    case 'th':
      return res.redirect('/th');
    case 'it':
      return res.redirect('/it');
    default:
      return res.redirect('/en'); // Idioma predeterminado
  }
});
app.post('/tarot',async(req,res)=>{
  const {name,cards,question,userInfo}= req.body;
  console.log("buscando")
  try {
    const rta=await openAI(name,cards,question,userInfo)
    console.log(rta)
    res.status(200).json(rta);
  } catch (error) {
    res.status(400).json({error:"Not working"});
  }
})
app.post('/tarotAI',async(req,res)=>{
  const {historySend}= req.body;
  console.log("buscando")
  try {
    const rta=await tarotAI(historySend)
    console.log(rta)
    res.status(200).json(rta);
  } catch (error) {
    res.status(400).json({error:"Not working"});
  }
})
app.get('/:lang', async(req, res) => {
  let lang = req.params.lang;
  console.log(lang)
  //lang="en"
  //const langText= JSON.parse(fs.readFileSync(path.join(__dirname, 'lang',`${lang}.json`), 'utf8'));
  //console.log(langText)
  return res.sendFile(path.join(__dirname,'public', 'index.html'))
  //res.render('index', langText);
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

