//import Characters from "../../models/characters.js";
//import APIService from "./api-service.js"

//Classes for handling races
import CharacterRaces from "../../models/character-races.js"
import CharacterRace from "../../models/character-race.js"

//Classes for handling classes
import CharacterClasses from "../../models/character-classes.js"
import CharacterClass from "../../models/character-class.js"

//Class for handling ability scores
import CharacterAbilityScores from "../../models/character-abilityscores.js"
import CharacterAbilityScore from "../../models/character-abilityscore.js"

//import CharacterProficiency from "../../models/character-proficiency.js"

import RacesService from "./races-service.js"
import ClassesService from "./classes-service.js"

const _racesService = new RacesService()
const _classesService = new ClassesService()

// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    headers: { 'Content-Type': 'application\json' }, 
    timeout: 3000
});

let _state = {
    characters: [],
    character: {},
    raceSelection: {},
    races: [],
    //race: {},
    classSelection: {},
    classes: [], 
    //class: {},
    abilityScoresData: {},
    abilityScoresInfo: [],
    levels: {},
    proficiencies: [],
    classProficiencies: []
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
    abilityScores:[],
    abilityScoresData: [],
    abilityScoresInfo: [],
    proficiencies: [],
    classProficiencies: []
}


function _setState(prop, data) {
    if (prop == "abilityScoresInfo" || prop == "proficiencies" || prop == "classProficiencies") {
        _state[prop].push(data);
    } else if (prop == "abilityScoresData") {
        _state[prop] = data;
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


export default class CharacterService {

    constructor() {
        _racesService.allRaces()
        _racesService.addRaceSubscriber('raceSelection', raceSelection)
        _racesService.addRaceSubscriber('races', races)

        _classesService.allClasses()
        _classesService.addClassSubscriber('classSelection', classSelection)
        _classesService.addClassSubscriber('classes', classes)

    }

    get Character() { return _state.character }
           
    get Races() { return _state.races }

    get RaceSelection() { return _state.raceSelection }

    //get Race() { return _state.race; }
    
    get Classes() { return _state.classes }

    get ClassSelection() { return _state.classSelection }

    //get Class() { return _state.class }  

    get AbilityScores() { return _state.abilityScoresData }

    get AbilityScoresInfo() { return _state.abilityScoresInfo }

    get AbilityScoreData() { return _state.abilityScoreData }


    get Proficiencies() { return _state.proficiencies }


    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    chooseRace(raceIndex) {
        let races = _state.races;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                _setState('race', new CharacterRace(races[i]))
            }
        }
    }

    flipChosenRace(raceIndex) {
        let races = _state.races;
        var index = 0;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                races[i].switchRace(races[i].chosen)
                index = i;
            }
        }
    }

    flipChosenClass(classIndex) {
        let classes = _state.classes;
        var index = 0;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                classes[i].switchClass(classes[i].chosen)
                index = i;
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
        this.classProficiencies()
    } 

    classProficiencies() {
        let cClass = _state.character.class
    }

    saveAbilityScores() {
        let abilityScores = _state.abilityScoresInfo;
        _setState( 'abilityScores', abilityScores)
    }

    setAbilityScore(ability, num) {
        let abilities = _state.abilityScoresInfo;
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].name == ability) {
                abilities[i].setPoints(num)
            }
        }
    }
    
    fillRaceSelection() {
        var races = _state.races;
        for (var i = 0; i < races.count; i++) {
            this.getSpecificRace(races.results[i].url)
        }
    }

    fillClassSelection() {
        var classes = _state.classes;
        for (var i = 0; i < classes.count; i++) {
            this.getSpecificClass(classes.results[i].url)
        }
    }

    fillAbilityScoreInfo() {
        var abilityScores = _state.abilityScoresData;

    //    console.log("ABIIBSIISIFSDFD", abilityScores)
        for (var i = 0; i < abilityScores.count; i++) {
            this.getSpecificAbilityScore(abilityScores.results[i].url)
        }
    }

    getAllAbilityScores() {
        characterApi.get('/ability-scores/')
            .then(res => {
               console.log("Ability Scores", res.data);
                _setState('abilityScoresData', new CharacterAbilityScores(res.data))
                this.fillAbilityScoreInfo();
            }).catch(err => {
                console.log("Error requesting ability scores: ", err)
            })
    }

    getSpecificAbilityScore(url) {
        characterApi.get(url)
            .then(res => {
                _setState('abilityScoresInfo', new CharacterAbilityScore(res.data))
            }).catch(err => {
                console.log("Error requesting ability score info ", err)
            })
    }

    getClassLevels(url) {
        characterApi.get(url)
            .then(res => {
                console.log("CLASS LEVELS RESPONSE", res.data)
                //_setState('levels', new CharacterClassLevels(res.data))
            }).catch(err => {
                console.log("Error requesting class levels info ", err)
            })
    }
  
  
}
