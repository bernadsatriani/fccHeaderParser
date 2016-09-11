const express = require('express');
const useragent = require('express-useragent')
const si = require('systeminformation');

const app = express();
app.use(useragent.express());

app.set('port', (process.env.PORT ||3000));

app.get('/', (req, res) => {
    const output = {};
    
    output.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    output.language = req.headers['accept-language'].split(',')[0];
    output.system = {};
    
    si.system((data) => {
        const systemInfo = req.useragent;
        
        output.system.info = `${systemInfo.platform} ${systemInfo.os}, ${systemInfo.browser}`;
    
        si.cpu((data) => {
            output.system.cpu = `${data.manufacturer} ${data.brand}, ${data.speed + 'GHz'} - ${data.cores + ' Cores'}`
            
            res.send(output);
            res.end();
        });
    });
});

app.listen(app.get('port'));