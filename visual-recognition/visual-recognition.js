var VisualRegnitionV3 = require('watson-developer-cloud/visual-recognition/v3')
var fs = require('fs')

var visualRecognition = new VisualRegnitionV3({
    url: 'https://gateway.watsonplatform.net/visual-recognition/api',
    version: '2018-03-19',
    iam_apikey: '9TYPsAPUPb_XK08ROtYMcn6cTgMy6CeWUaGwSjtJktM-'
})

var params = {
    images_file: fs.createReadStream('./resources/ferrari.png')
}

visualRecognition.classify(params, function(err, res){
    if(err){
        console.log(err)
    } else {
        console.log(JSON.stringify(res, null, 2))
    }
})