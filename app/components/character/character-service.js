import RacesService from "./races-service.js"
import ClassesService from "./classes-service.js"
import AbilityScoresService from "./abilityscores-service.js"

const _racesService = new RacesService()
const _classesService = new ClassesService()
const _abilityScoresService = new AbilityScoresService()

// @ts-ignore
/*
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    headers: { 'Content-Type': 'application\json' }, 
    timeout: 3000
})*/

let _state = {
    characters: [],
    character: {},
    raceSelection: {},
    races: [],
    //race: {},
    classSelection: {},
    classes: [], 
    //class: {},
    abilityScoresSelection: {},
    abilityScoresData: [],
    levels: {}
}

let _subscribers = {
    characters: [],
    character: [],
    races: [],
    raceSelection: [],
    race: [],
    classes: [],
    classSelection: [],
    class: [],
    abilityScoresSelection: [],
    abilityScoresData: [],
    abilityScores: [],
    levels: []
}


function _setState(prop, data) {
    if (prop == "proficiencies" || prop == "classProficiencies") {
        _state[prop].push(data);
    } else if (prop == "race" || prop == "class" || prop == "abilityScores") {
        _state['character'][prop] = data;
    } else {
        _state[prop] = data 
    }
    _subscribers[prop].forEach(fn => fn());
}

function raceSelection() {
    _setState('raceSelection', _racesService.RaceSelection) 
}

function races() {
    _setState('races', _racesService.Races)
}

function classSelection() {
    _setState('classSelection', _classesService.ClassSelection)
}

function classes() {
    _setState('classes', _classesService.Classes)
}

function abilityScoresSelection() {
    _setState('abilityScoresSelection', _abilityScoresService.AbilityScoresSelection)
}

function abilityScoresData() {
    _setState('abilityScoresData', _abilityScoresService.AbilityScoresData)
}

export default class CharacterService {

    constructor() {        
        _racesService.allRaces()
        _racesService.addRaceSubscriber('raceSelection', raceSelection)
        _racesService.addRaceSubscriber('races', races)

        _classesService.allClasses()
        _classesService.addClassSubscriber('classSelection', classSelection)
        _classesService.addClassSubscriber('classes', classes)
        
        _abilityScoresService.allAbilityScores()
        _abilityScoresService.addAbilityScoresSubscriber('abilityScoresSelection', abilityScoresSelection)
        _abilityScoresService.addAbilityScoresSubscriber('abilityScoresData', abilityScoresData)
    }

    get Character() { return _state.character }
           
    get RaceSelection() { return _state.raceSelection }

    get Races() { return _state.races }
    
    //get Race() { return _state.race; }
    
    get ClassSelection() { return _state.classSelection }
    
    get Classes() { return _state.classes }
        
    //get Class() { return _state.class }  

    get AbilityScoresSelection() { return _state.abilityScoresSelection }

    get AbilityScoresData() { return _state.abilityScoresData }


    get Proficiencies() { return _state.proficiencies }


    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    chooseRace(raceIndex) {
        let races = _state.races;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                _setState('race', races[i])
                break
            }
        }
    }

    flipChosenRace(raceIndex) {
        let races = _state.races;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                races[i].switchRace(races[i].chosen)
                break
            }
        }
    }

    flipChosenClass(classIndex) {
        let classes = _state.classes;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                classes[i].switchClass(classes[i].chosen)
                break
            }
        }
    }

    chooseClass(classIndex) {
        let classes = _state.classes;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                _setState('class', classes[i])
                break
            }
        }
        this.flipChosenClass(classIndex)
    }

    saveAbilityScores() {
        let abilityScores = _state.abilityScoresData
        _setState('abilityScores', abilityScores)
    }

    setAbilityScore(ability, num) {
        let abilities = _state.abilityScoresData;
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].name == ability) {
                abilities[i].setPoints(num)
            }
        }
    }
  
    getClassLevels(url) {
        characterApi.get(url)
            .then(res => {
                console.log("CLASS LEVELS RESPONSE", res.data)
            }).catch(err => {
                console.log("Error requesting class levels info ", err)
            })
    }
  
  
}
