const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Connect
connectDB();

app.use(express.json({extended:false}))
// Define Routes 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contacts'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})