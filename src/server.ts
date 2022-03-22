import app from './app'

import { prepareArticles } from './database/articles';
import { prepareChannels } from './database/channels';


var server = app.listen(8081, async function () {
    await prepareChannels();
    await prepareArticles();

    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
