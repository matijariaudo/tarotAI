const {OpenAI}=require('openai')
const readline = require("readline");
require('dotenv').config()

const apiKeyOpenAI=process.env.OPENAIKEY;
client = new OpenAI({
    organization:'org-0Tqti9H3plCABWuOmhQRyjqy',
    project:'proj_2hUw4IOIXcdRfe2lvu7k9bIy',
    apiKey:apiKeyOpenAI
})


async function main() {
    console.time("1")
    const stream = await client.chat.completions.create({
        model: "gpt-4o-mini",messages:[
        {
            "role":"system",
            "content":`
            Acts as a tarot reader. We provide tarot services and you will be our tarot reader.
            Answer Format: JSON
            1)language: Language detected in user question
            2)Objects array(size 3) called cards. 
            "cards" fields: 
            a)nameCard:(String name).
            b)meaning: String(between 80 and 100 words)giving answer to user question. Write as if you were a positive tarot reader, try to do predictions.
            3)resume: String (between 150 and 180 words) IMPORTANT:Don't repeat what you put on each individual card. Make a closure. Answer the question base on 3 cards.
            Notes: 2(a & b),3 must writing in language detected in 1. There must be 3 letters and you must respect the indicated json format.
            When possible try to empathize, phrases like "I know that sometimes you are... but this time", horoscoponegro.com style.
            ` 
        },{
            "role": "user", 
            "content": `{name:'Matias',question:'Cuentame sobre mi futuro',cards:'2 de oro 3 de bastos'}`
        }
        ]
    });
    console.timeEnd("1")
    console.log("Finished",stream)
}

main().catch(console.error);
