const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')
const readline = require('readline')

const translationIAMApiKey = "UQIM8upGWlWLRzRjh2C2BjmEFA-jJVP8pdftcl39I1j6"
const translationUrl = "https://gateway.watsonplatform.net/language-translator/api"

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
    var params = {
        text: value
    }
    
    languageTranslator.identify(
        params,
        function(error, response){
            if(error){
                console.log(error)
            } else {
                //console.log(JSON.stringify(response, null, 2))
                languageIdetified = response.languages[0].language
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
                        }
                    }
                )
                
            }
        }
    )
    rl.close()
})

/*
var params = {
    text: 'Hello'
}

languageTranslator.identify(
    params,
    function(error, response){
        if(error){
            console.log(error)
        } else {
            console.log(JSON.stringify(response, null, 2))
        }
    }
)

var translate = {
    text: 'Eu estou indo almoçar',
    model_id: 'pt-en'
}

languageTranslator.translate(
    translate,
    function(error, response){
        if(error){
            console.log(error)
        } else {
            console.log(JSON.stringify(response, null, 2))
        }
    }
)*/

