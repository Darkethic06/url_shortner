const express = require('express')
const mongoose = require('mongoose')
const URL = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost:27017/urlShortner',{

})

app.set('view engine','ejs')
app.use(express.urlencoded({extended : false}))

app.get('/',  async (req,res)=>{
    const allShortUrls = await URL.find(); 
    res.render('index',{data : allShortUrls})
})

app.post('/shortUrls', async (req,res)=>{
 await URL.create({ full : req.body.fullUrl})
 res.redirect('/')
})


app.get('/:shorturl', async (req,res)=>{
   const shortUrl = await URL.findOne({short : req.params.shorturl})
    
   if(shortUrl == null) return res.sendStatus(404)
   
   shortUrl.totalClicks++
   shortUrl.save()
    res.redirect(shortUrl.full)
})


app.listen(process.env.PORT || 5000)

console.log("app started on: ")