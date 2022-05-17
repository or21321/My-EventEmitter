'use strict'
// Function:

// try {
//     const emitter = getEventEmitter()

//     const removeListener1Id = emitter.addListener('someEvent', console.log, 'someEvent listener1', 'second argument')
//     const removeListener2Id = emitter.addListener('someEvent', console.log, 'someEvent listener2', 'second argument', 'third argument')
//     const removeListener3Id = emitter.addListener('someEvent2', console.log, 'someEvent2 listener')

//     emitter.emit('someEvent')
//     emitter.emit('someEvent2')

//     emitter.removeListener('someEvent', removeListener1Id)

//     emitter.emit('someEvent')
//     emitter.emit('someEvent2')

//     function getEventEmitter() {
//         const listenersMap = {}
//         let id = 1

//         function getListeners() {
//             return listenersMap
//         }

//         function addListener(event, cb, ...rest) {
//             if (!listenersMap[event]) listenersMap[event] = {}
//             // Opt1 /w apply:
//             // this.#listenersMap[event][this.id] = () => cb.apply(null, rest)
//             // Opt2 /w bind:
//             listenersMap[event][id] = cb.bind(null, ...rest)
//             return id++
//         }

//         function emit(event) {
//             if (!listenersMap[event]) throw Error('The event isnt found')
//             for (let listener in listenersMap[event]) {
//                 const cb = listenersMap[event][listener]
//                 if (cb instanceof Function) cb()
//             }
//         }

//         function removeListener(event, id) {
//             if (!listenersMap[event]) throw Error('The event isnt found')
//             listenersMap[event][id] = null
//             delete listenersMap[event][id]
//         }

//         return {
//             addListener,
//             emit,
//             getListeners,
//             removeListener
//         }
//     }
// } catch (err) {
//     console.log(err);
// }

// Class:

class EventEmitter {
    #listenersMap = {}
    id = 1

    getListeners() {
        return this.#listenersMap
    }

    addListener(ev, cb, ...rest) {
        if (!this.#listenersMap[ev]) this.#listenersMap[ev] = {}
        // Opt1 /w apply:
        // this.#listenersMap[ev][this.id] = () => cb.apply(null, rest)
        // Opt2 /w bind:
        this.#listenersMap[ev][this.id] = cb.bind(null, ...rest)
        return this.id++
    }

    emit(ev) {
        if (!this.#listenersMap[ev]) throw Error('The event isnt found')
        for (let listener in this.#listenersMap[ev]) {
            const cb = this.#listenersMap[ev][listener]
            cb()
        }
    }

    removeListener(ev, id) {
        if (!this.#listenersMap[ev]) throw Error('The event isnt found')
        delete this.#listenersMap[ev][id]
    }
}

try {
    const eventEmitter = new EventEmitter()

    const removeListener1Id = eventEmitter.addListener('someEvent', console.log, 'someEvent listener1', 'second argument')
    const removeListener2Id = eventEmitter.addListener('someEvent', console.log, 'someEvent listener2', 'second argument', 'third argument')
    const removeListener3Id = eventEmitter.addListener('someEvent2', console.log, 'someEvent2 listener')

    eventEmitter.emit('someEvent')
    eventEmitter.emit('someEvent2')

    eventEmitter.removeListener('someEvent', removeListener1Id)

    eventEmitter.emit('someEvent')
    eventEmitter.emit('someEvent2')
} catch (err) {
    console.log(err);
}

