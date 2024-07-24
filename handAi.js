const {OpenAI}=require('openai')
const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config()

const apiKeyOpenAI=process.env.OPENAIKEY;
// Leer la imagen desde el sistema de archivos
const init=()=>{
sharp('./public/assets/img/hand.jpeg');
}

const openAI=async(imageBase64)=>{
    client = new OpenAI({
    organization:'org-0Tqti9H3plCABWuOmhQRyjqy',
    project:'proj_2hUw4IOIXcdRfe2lvu7k9bIy',
    apiKey:apiKeyOpenAI
    })
    consulta =await client.chat.completions.create({
        model: "gpt-4",
        messages:[
        {
        "role":"system",
        "content":`
            Actua como experto en tarot y lectura de manos. El usuario enviara la foto de su mano y deberas hacer una lectura.
        ` 
        },{
            "role": "user", 
            "content": `${JSON.stringify({imageBase64})}`
        }
        ]
    })
    console.log("FIN")
    console.log(consulta?.choices[0]?.message.content)
    const jsonRta=JSON.parse(consulta?.choices[0]?.message.content);
    return jsonRta;
}

//openAI(imageBase64)

// Ruta de la imagen original
const inputImagePath = './public/assets/img/hand.jpeg';
// Ruta de la imagen comprimida
const outputImagePath = './public/assets/img/hand_compressed.jpeg';

sharp(inputImagePath)
  .resize(128) // Redimensionar a un ancho de 800px (ajusta este valor según tus necesidades)
  .toFormat('jpeg', { quality: 100 }) // Convertir a JPEG con calidad 80
  .toFile(outputImagePath, (err, info) => {
    if (err) {
      console.error('Error al procesar la imagen:', err);
      return;
    }

    // Leer la imagen comprimida desde el sistema de archivos
    const compressedImage = fs.readFileSync(outputImagePath);
    // Convertir la imagen a base64
    const imageBase64 = compressedImage.toString('base64');
    openAI(imageBase64)
});
