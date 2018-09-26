const express = require('express')
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')

const app = express()

const translationIAMApiKey = "UQIM8upGWlWLRzRjh2C2BjmEFA-jJVP8pdftcl39I1j6"
const translationUrl = "https://gateway.watsonplatform.net/language-translator/api"

var languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: translationIAMApiKey,
    url: translationUrl
})

app.get('/watson', (req, res) => {
    var translate = {
        text: req.query.texto,
        model_id: 'en-pt'
    }
    languageTranslator.translate(
        translate,
        function (error, response) {
            if (error) {
                console.log(error)
            } else {
                res.send(`Texto traduzido = ${response.translations[0].translation}`)
            }
        }
    )
})

app.listen(3000, () => {
    console.log('Backend executando....')
})