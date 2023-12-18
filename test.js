class LoggerInterface {
    constructor() {
        if (this.constructor === LoggerInterface) {
            throw new Error('LoggerInterface cannot be instantiated directly.')
        }
    }
    severeFunction(message) {
        throw new Error('severeFunction must be implemented in derived classes.')
    }

    configFunction(message) {
        throw new Error('configFunction must be implemented in derived classes.')
    }

    infoFunction(message) {
        throw new Error('infoFunction must be implemented in derived classes.')
    }

    fineFunction(message) {
        throw new Error('fineFunction must be implemented in derived classes.')
    }

    finerFunction(message) {
        throw new Error('finerFunction must be implemented in derived classes.')
    }

    log(level, message) {
        const logFunction = this[level.toLowerCase()]
        logFunction.call(this, message)
    }
}

class LoggerSevere extends LoggerInterface {
    severeFunction(message) {
        console.error(`SEVERE: ${message}`)
    }

    configFunction(message) {
        console.log(`CONFIG: ${message}`)
    }

    infoFunction(message) {
        console.log(`INFO: ${message}`)
    }

    fineFunction(message) {
        console.log(`FINE: ${message}`)
    }

    finerFunction(message) {
        console.log(`FINER: ${message}`)
    }
}

class Severe extends Logger {
    severeFunction(message) {
    }
}
class Config extends Severe {
    configFunction(message) {
    }
}
class Info extends Config {
    infoFunction(message) {
    }
}
class Fine extends Info {
    fineFunction(message) {
    }
}
class Finer extends Fine{
    finerFunction(message) {
    }
}


const logger = new Logger()
logger.log("info", "This is an information message")
logger.log("severe", "This is a severe message")
logger.log("debug", "This is a debug message")


// // if(a) {
// //     x = 3
// // }else{
// //     x = y
// // }


// let a = false
// let y = 0
// let x = y

// while (!a) {
//     x = 3
//     a = true
// }
// console.log(x);