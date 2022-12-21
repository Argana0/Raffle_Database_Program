const express = require('express'); 

const app = express();

const userRoutes = require('./routes/api/user')
const hostRoutes = require('./routes/api/host')

app.use(express.json({extended:false}));
app.use('/api/user', userRoutes); 
app.use('/api/host', hostRoutes); 

app.get('/',(req,res) => res.send('API IS Running!!!'));

const PORT = 6969;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));