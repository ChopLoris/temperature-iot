const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('User Connected ' + socket.id)

    socket.on('temperature', ({temperatureInfo, humanityInfo}) => {
        io.emit('temperature', {temperatureInfo, humanityInfo})
        console.log({temperatureInfo, humanityInfo})
    })

    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message})
        console.log(message)
    })
})

http.listen(4000, function () {
    console.log('Listening on port 4000')
})