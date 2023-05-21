const express = require('express')
const connectDB = require('./config/db')


const app = express()
const PORT = process.env.PORT || 5000

// Connect
connectDB();

app.use(express.json({extended:false}))
// Define Routes 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contacts'))

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})