const os = require("os");
const express = require("express");
const app = express();

app.set('port', (process.env.PORT ||3000));

app.get('/', (req, res) => {
    const output = {};
    
    output.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    output.language = req.headers["accept-language"];
    output.host = os.hostname();
    output.system = `${os.platform()} ${os.release()}, ${os.arch()} `
    
    res.send(output);
    res.end
});


app.listen(app.get('port'));