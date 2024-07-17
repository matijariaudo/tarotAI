const {OpenAI}=require('openai')
require('dotenv').config()

const apiKeyOpenAI=process.env.OPENAIKEY;

const openAI=async(userName,cards,question)=>{
client = new OpenAI({
  organization:'org-0Tqti9H3plCABWuOmhQRyjqy',
  project:'proj_2hUw4IOIXcdRfe2lvu7k9bIy',
  apiKey:apiKeyOpenAI
})
consulta =await client.chat.completions.create({
    model:"gpt-3.5-turbo",
    response_format:{ "type": "json_object" },
    messages:[
    {
       "role":"system",
       "content":`
       Acts as a tarot reader. We provide tarot services and you will be our tarot reader.
       Answer Format: JSON
       1)language: Language detected in user question
       2)Objects array called cards. "cards" fields: 
        a)nameCard:(String name).
        b)Meaning: String(>300 <400 words)giving answer to user question. Write as if you were a positive tarot reader, try to do predictions.
       3)resume: String (>1000 <1200 words) IMPORTANT:Don't repeat what you put on each individual card. Make a closure. Answer the question base on 3 cards.
       Notes: 2(a & b),3 must writing in language detected in 1.
       ` 
    },{
        "role": "user", 
        "content": `${JSON.stringify({userName,question,cards})}`
    }
    ]
})
    const jsonRta=JSON.parse(consulta?.choices[0]?.message.content);
    return jsonRta;
}

module.exports={openAI}