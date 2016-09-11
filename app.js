const express = require('express');
const si = require('systeminformation');

const app = express();

app.set('port', (process.env.PORT ||3000));

app.get('/', (req, res) => {
    const output = {};
    
    output.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    output.language = req.headers["accept-language"];
    
    si.system((data) => {
        output.system = {};
        output.system.info = `${data.manufacturer}, ${data.model} ${data.version}`;
    
        si.cpu((data) => {
            output.system.cpu = `${data.manufacturer} ${data.brand}, ${data.speed + 'GHz'} - ${data.cores + ' Cores'}`
            
            si.osInfo((data) => {
                output.system.os = `${data.platform}, ${data.logofile} ${data.release}`;
                
                res.send(output);
                res.end();
            });
        });
    });
});

app.listen(app.get('port'));