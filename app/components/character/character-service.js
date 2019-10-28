//import Characters from "../../models/characters.js";

//Classes for handling races
import CharacterRaces from "../../models/character-races.js"
import CharacterRace from "../../models/character-race.js"

//Classes for handling classes
import CharacterClasses from "../../models/character-classes.js"
import CharacterClass from "../../models/character-class.js"


// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    headers: { 'Content-Type': 'application\json' }, 
    timeout: 3000
});

let _state = {
    character: {},
    races: {},
    race: {},
    classes: {},
    class: {}
}

let _subscribers = {
    character: [],
    races: [],
    race: [],
    classes: [],
    class: []
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
        return _state.classes;
    }

    get Races() {
        console.log("What is being returned as races: ", _state.races)
        return _state.races;
    }

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    getAllRaces() {
        console.log('Asking DnD for the races of Faerun.')
        characterApi.get("/races/")
            .then(res => {
                console.log('The races we were given: ', res)
                _setState('races', new CharacterRaces(res.data))
            })                    
            .catch(err => {
                console.log("Error asking for ALL races: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }

    getSpecificRace(raceNumber) {
        console.log('Asking DnD for the races of Faerun.')
        characterApi.get("/races/" + raceNumber)
            .then(res => {
                console.log('The races we were given: ', res)
                _setState('race', new CharacterRace(res))
            }).catch(err => {
                console.log("Error asking for a specific race: ", err)
                //_setState('error', err.response.data)
            })
        console.log("What are the character subscribers: ", _subscribers)
    }

    getAllClasses() {
        console.log('Asking DnD for the classes of the Forgotten Realms.')
        characterApi.get("/classes/")
            .then(res => {
                console.log('All Classes from DnD API: ', res)
                _setState('classes', new CharacterClasses(res))
            }).catch(err => {
                console.log("Error requesting ALL Classes: ", err)
                //_setState('error', err.response.data)
            })
        //        console.log("What are the character subscribers: ", _subscribers)
    }

    getSpecificClass(classNumber) {
        console.log('Requesting specific class information.')
        characterApi.get("/classes/" + classNumber)
            .then(res => {
                console.log('Specific Class from DnD API: ', res)
                _setState('class', new CharacterClass(res))
            }).catch(err => {
                console.log("Error requesting specific class info: ", err)
            })
    }

  
  
}
