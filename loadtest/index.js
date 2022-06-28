import autocannon from 'autocannon'

const instance = autocannon({
    url: 'http://kubernetes.docker.internal/',
    connections: 32,
    duration: 60,
    //overallRate: 10, // per second
    //amount: 1000,
    requests: [{
        method: "GET"
    }]
}, console.log)

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
    instance.stop()
})

// just render results
autocannon.track(instance, {
    renderProgressBar: false
})

