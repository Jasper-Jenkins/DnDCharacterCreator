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

let _races = {
    races: {}
}

let _classes = {
    classes: {}
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

    get Classes() {
        return _classes.classes;
    }

    get Races() {
        return _races.races;
    }

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    getAllRaces() {
        console.log('Asking DnD for the races of Faerun.')
        characterApi.get("/races/")
            .then(res =>
                console.log('The races we were given: ', res))
        _setState('character', new AllRaces())
            .catch(err => {
                console.log("Character creation error: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }

    getSpecificRace(raceNumber) {
        console.log('Asking DnD for the races of Faerun.')
        characterApi.get("/races/" + raceNumber)
            .then(res =>
                console.log('The races we were given: ', res))
        _setState('character', new CharacterRace())
            .catch(err => {
                console.log("Character creation error: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }

    getAllClasses() {
        console.log('Asking DnD for the classes of the Forgotten Realms.')
        characterApi.get("/classes/")
            .then(res => {
                console.log('What DnD allows: ', res)
                _setState('character', new AllClasses(res))
            }).catch(err => {
                console.log("Character creation error: ", err)
                //_setState('error', err.response.data)
            })
        //        console.log("What are the character subscribers: ", _subscribers)
    }

    getSpecificClass(classNumber) {
        console.log('Requesting specific class information.')
        characterApi.get("/classes/" + classNumber)
            .then(res => {
                console.log('Class information: ', res)
                _setClasses('classes', new CharacterClass(res))
            }).catch(err => {
                console.log("Error requesting specific class info: ", err)
            })
    }

  
  
}
