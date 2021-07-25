const express = require('express')
const path = require('path')
const nocache = require('nocache')

const app = express()

app.set('port', 8080)

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`)
});

let arr = []  /*?????????????????*/
let eta = []
let time = Date.now()

app.get('/api/queue/', (req, res) => {
    try {
        if (arr.length === 0) {
            arr.push(1)
        } else {
            arr.push(arr[arr.length - 1] + 1)
        }
        console.log(arr)
        res.send(`${arr[arr.length - 1]}`)
    } catch (error) {
        throw error
    }

})

app.post('/api/queue/', (req, res) => {
    try {
        if (arr.length === 0) {
            arr.push(1)
        } else {
            arr.push(arr[arr.length - 1] + 1)
        }
        //  console.log(arr)
        res.send(`${arr[arr.length - 1]}`)
    } catch (error) {
        throw error
    }

})

app.get('/api/queue-add/', (req, res) => {
    try {
        if(!arr.includes(parseInt(req.query.num))){
            arr.push(parseInt(req.query.num))
        }
        console.log(arr)
        res.send(`${arr}`)
    } catch (error) {
        throw error
    }

})

app.get('/api/queue-del/', (req, res) => {
    try {
        if(arr.includes(parseInt(req.query.num))){
            let index = arr.indexOf(parseInt(req.query.num))
            if (index > -1) {
                arr.splice(index, 1)
            }
            if(index < 3) {
                if (eta.length < 10){
                    eta.push(Date.now() - time)
                } else {
                    eta.shift()
                    eta.push(Date.now() - time)
                }
            }
        }
        time = Date.now()
        res.send(`${arr}`)
    } catch (error) {
        throw error
    }

})

app.get('/api/queue-fetch/', (req, res) => {
    try {
        res.json(arr)
    } catch (error) {
        throw error
    }

})

app.get('/api/reg/', (req, res) => {
    try {
        if(req.query.login === "admin@iasa.kpi" && req.query.pass === "riba_metch"){
            res.send({'res': '11'})
        } else {
            res.send({'res': '00'})
        }
    } catch (error) {
        throw error
    }

})

app.get('/api/queue-swap/', (req, res) => {
    try {
        if(arr.length === 1) {
            res.send('1')
        } else {
            const f = arr.indexOf(parseInt(req.query.first))
            const s = arr.indexOf(parseInt(req.query.second))
            arr.splice(f, 1, arr.splice(s, 1, arr[f])[0])
            res.send('ok')
        }
    } catch (e) {
        throw e
    }
})

app.get('/api/queue-freeze/', (req, res) => {
    try {
        const i = parseInt(req.query.idx)
        /*start count item*/
        const el = arr[i]
        arr.splice(i, 1) //delete one at index i
        if((i + 4) >= arr.length) {
            arr.push(el)
        } else {
            arr.splice(i + 4, 0, el)
        }
        res.send('ok')
    } catch (e) {
        throw e
    }
})

app.get('/api/time/', (req, res) => {
    try {
        console.log(eta)
        let avg_eta = eta.reduce((a, b) => a + b, 0)
        avg_eta = Math.ceil(avg_eta / (60000*eta.length))
        res.send("{"+`"res": "${avg_eta}"`+"}")
    } catch (e) {
        throw e
    }
})

app.get('/api/queue-set/', (req, res) => {
    try {
        arr = JSON.parse(req.query.queue)
        res.send("ok")
    } catch (e) {
        throw e
    }
})

app.use('/', express.static(path.join('./dist')))
app.use('/admin', express.static(path.join('./dist')))
app.use('/queue', express.static(path.join('./dist')))
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    next()
})
app.use(nocache())
