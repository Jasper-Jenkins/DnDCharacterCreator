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
    character: [],
    races: {},
    racesInfo: [],
    race: {},
    classes: {},
    classesInfo: [],
    class: {}
}

let _subscribers = {
    character: [],
    races: [],
    racesInfo: [],
    race: [],
    classes: [],
    classesInfo: [],
    class: []
}

function _setState(prop, data) {
    if (prop == "racesInfo" || prop == "classesInfo" || prop == "character") {
        _state[prop].push(data);
    } else {
        _state[prop] = data 
    }
    _subscribers[prop].forEach(fn => fn());
}

function _replaceInState(prop, data, key) {
    if (key == 'race') {
        _state[prop][0] = data;
    } else if (key == 'class') {
        _state[prop][1] = data;
    }
}

export default class CharacterService {

    get Character() { return _state.character }
           
    get Races() { return _state.races; }

    get RacesInfo() { return _state.racesInfo; }

    get Race() { return _state.race; }
    
    get Classes() { return _state.classes }

    get ClassesInfo() { return _state.classesInfo }

    get Class() { return _state.class }  

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    chosenRace(raceIndex) {
        let races = _state.racesInfo; //array 
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                    _setState('character', { 'details': new CharacterRace(races[i]) })
            }
        }
    }

    replaceRace(raceIndex) {
        let races = _state.racesInfo;
          for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                _replaceInState('character', { 'details': new CharacterRace(races[i]) }, 'race')
            }
        }
    }    

    chosenClass(classIndex) {
        let classes = _state.classesInfo; 
        console.log("CLASSES: ", classes)
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                    _setState('character', { 'details': new CharacterClass(classes[i]) })
            }
        }
    }

    replaceClass(classIndex) {
        let classes = _state.classesInfo;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                _replaceInState('character', { 'details': new CharacterClass(classes[i]) }, 'class')
            }
        }
    }

   
    getAllRaces() {
        console.log('Requesting the races of Faerun from the DnD API')
        characterApi.get("/races/")
            .then(res => {
                console.log('All the races of Faerun: ', res.data)
                _setState('races', new CharacterRaces(res.data))
            })                    
            .catch(err => {
                console.log("Error requesting ALL races: ", err)
                //_setState('error', err.response.data)
            })
     //   console.log("What are the subscribers when ALL races are requested: ", _subscribers)
    }

    getSpecificRace(url) {
        console.log('Requesting specific race information.')
        characterApi.get(url)
            .then(res => {
                console.log('Race information: ', res.data)
                _setState('racesInfo', new CharacterRace(res.data))
            })
            .catch(err => {
                console.log("Error requesting a SINGLE race: ", err)
                //_setState('error', err.response.data)
            })
    //    console.log("What are the subscribers when SPECIFIC races are requested: ", _subscribers)
    }

    getAllClasses() {
        console.log('Conjuring the champion classes of Faerun.')
        characterApi.get("/classes/")
            .then(res => {
             //   console.log('All the classes of Fearun: ', res.data)
                _setState('classes', new CharacterClasses(res.data))
            }).catch(err => {
                console.log("Error requesting ALL Classes: ", err)
                //_setState('error', err.response.data)
            })
        //        console.log("What are the character subscribers: ", _subscribers)
    }

    getSpecificClass(url) {
        console.log('Requesting specific class information.')
        characterApi.get(url)
            .then(res => {
               // console.log('Class information: ', res.data)
                _setState('classesInfo', new CharacterClass(res.data))
            }).catch(err => {
    //            console.log("Error requesting specific class info: ", err)
            })
    }

  
  
}
