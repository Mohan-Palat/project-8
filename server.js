const express = require('express');
const app = express();
const PORT = 3000;  //ADD THIS TO ENV VARIABLE

app.get('/', (reg, res) => {
    res.send('Yo Man');
})





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});