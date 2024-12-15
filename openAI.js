const {OpenAI}=require('openai')
require('dotenv').config()

const apiKeyOpenAI=process.env.OPENAIKEY;

const openAI=async(userName,cards,userQuestion,userInfo)=>{
client = new OpenAI({
  organization:'org-0Tqti9H3plCABWuOmhQRyjqy',
  project:'proj_2hUw4IOIXcdRfe2lvu7k9bIy',
  apiKey:apiKeyOpenAI
})
consulta =await client.chat.completions.create({
    model:"gpt-4o-mini",
    response_format:{ "type": "json_object" },
    messages:[
    {
       "role":"system",
       "content":`
       Acts as a tarot reader. We provide tarot services and you will be our tarot reader.
       Answer Format: JSON
       1)language: Language detected in user question
       2)Objects array(size 3) called cards. 
        "cards" fields: 
        a)nameCard:(String name).
        b)meaning: String(between 100 and 120 words)giving answer to user question. Write as if you were a positive tarot reader, try to do predictions.
        c)qty: quantity of words in meaning String.
       3)resume: String (between 180 and 240 words) IMPORTANT:Don't repeat what you put on each individual card. Make a closure. Answer the question base on 3 cards.
       Notes: 2(a & b),3 must writing in language detected in 1. There must be 3 letters and you must respect the indicated json format.
       When possible try to empathize, phrases like "I know that sometimes you are... but this time", horoscoponegro.com style.
       userInfo : It gives you extra information, which was collected with a questionnaire given to the user when he entered his question. 
       Please don't be too positive, Be trusly... act as a real and expert card reader.
       ` 
    },{
        "role": "user", 
        "content": `${JSON.stringify({userName,cards,userQuestion,userInfo})}`
    }
    ]
})
    console.log(consulta)
    const jsonRta=JSON.parse(consulta?.choices[0]?.message.content);
    return jsonRta;
}

module.exports={openAI}