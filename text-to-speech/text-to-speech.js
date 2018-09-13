const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')
const fs = require('fs')
const readline = require('readline')

const textToSpeech = new TextToSpeechV1({
    username: "aa6e39d3-43a7-4560-9f21-f0cbd176c25b",
    password: "aLd7bl5vKaBD"
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o texto ', (value) => {
    textToSpeech.synthesize({
        text: value,
        voice: 'pt-BR_IsabelaVoice',
        //voice: "en-US_AllisonVoice",
        accept: 'audio/wav'
    }).pipe(fs.createWriteStream('meuaudio.wav'))
    rl.close()
})
