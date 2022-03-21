import app from './app.js'

import { prepareArticles } from './database/articles.js';
import { prepareChannels } from './database/channels.js';


var server = app.listen(8081, async function () {
    await prepareChannels();
    await prepareArticles();

    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
