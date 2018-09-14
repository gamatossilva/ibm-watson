const readline = require('readline')
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')
const fs = require('fs')

const translationIAMApiKey = "UQIM8upGWlWLRzRjh2C2BjmEFA-jJVP8pdftcl39I1j6"
const translationUrl = "https://gateway.watsonplatform.net/language-translator/api"

const textToSpeech = new TextToSpeechV1({
    username: "aa6e39d3-43a7-4560-9f21-f0cbd176c25b",
    password: "aLd7bl5vKaBD"
})

var languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: translationIAMApiKey,
    url: translationUrl
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o texto ', (value) => {
    //let color = value
    //console.log(`You entered ${color}`);
    var params = {
        text: value
    }
    var languageIdetified = ''
    languageTranslator.identify(
        params,
        function(error, response){
            if(error){
                console.log(error)
            } else {
                languageIdetified = response.languages[0].language
                //console.log(languageIdetified)
                //console.log(JSON.stringify(response, null, 2))
                var translate = {
                    text: value,
                    model_id: `${languageIdetified}-pt`
                }
                
                languageTranslator.translate(
                    translate,
                    function(error, response){
                        if(error){
                            console.log(error)
                        } else {
                            //console.log(JSON.stringify(response, null, 2))
                            console.log(response.translations[0].translation)
                            var speech = {
                                text: response.translations[0].translation,
                                voice: 'pt-BR_IsabelaVoice',
                                accept: 'audio/wav'
                            }

                            textToSpeech.synthesize(
                                speech,
                                function(error, audio){
                                    if(error){
                                        console.log(error)
                                        return
                                    }
                                    textToSpeech.repairWavHeader(audio)
                                    fs.writeFileSync('audio.wav', audio)
                                    console.log('audio.wav written with a corrected wav header')
                                }
                            )
                        }
                    }
                )
            }
        }
    )


    rl.close();
});

