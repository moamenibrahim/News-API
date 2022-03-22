import app, { startDB } from './app'

var server = app.listen(8081, async function () {
    await startDB()
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
