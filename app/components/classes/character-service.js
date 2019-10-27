import Characters from "../../models/characters.js";

// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    headers: { 'Content-Type': 'application\json' }, 
    timeout: 3000
});

let _state = {
    character: {}
}

let _subscribers = {
    character: []
}

function _setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn());
}

export default class CharacterService {
    get Characters() {
        return _state.character
    }

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    getCharacterClasses() {
        console.log('Asking DnD for the classes of the Forgotten Realms.')
        characterApi.get("/classes/")
            .then(res => {
                console.log('What DnD allows: ', res)
                _setState('character', new Characters(res))
            }).catch(err => {
                console.log("Character creation error: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }

    getCharacterRaces() {
        console.log('Asking DnD for the races of Faerun.')
        characterApi.get("/races/")
            .then(res => 
                console.log('The races we were given: ', res))
            .catch(err => {
                console.log("Character creation error: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }
  
}
