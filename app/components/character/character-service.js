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
    //character: [],
    character: {},
    raceSelection: {},
    races: [],
    //race: {},
    classSelection: {},
    classes: [], 
    //  class: {},
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


function _replaceInState(prop, data) {
    if (prop == 'race') {
       // console.log('Eureka!Race!', data)
        _state["character"][prop] = data;
    } else if (prop == 'class') {
       // console.log('Eureka!Class!', data)
        _state["character"][prop] = data;
    } else if (prop == 'abilityScores') {
        //console.log('Eureka!AbilityPoints!', data)
        _state["character"][prop] = data
    }
}

function raceSelection() {
    var raceSelection = _racesService.RaceSelection
    console.log("SON OF A", raceSelection)
    _setState('raceSelection', raceSelection)
 //   _state['raceSelection'] = raceSelection; 
}

function races() {
    var races = _racesService.Races
    console.log("WHEEEE", races)
    _setState('races', races)
}

function classSelection() {
    var classSelection = _classesService.ClassSelection
    _setState('classSelection', classSelection)
}

function classes() {
    var classes = _classesService.Classes
    _setState('classes', classes)
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
        //    this.setProficiencies();
      //  proficiencies()
    }

    flipChosenRace(raceIndex) {
        let races = _state.races;
        var index = 0;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
               // console.log("did we make it???", races[i].name)
                races[i].switchRace(races[i].chosen)
                index = i;
            }
        }
        console.log("race choice flip, this should be true: ", _state.races[index].chosen)
    }

    flipChosenClass(classIndex) {
        let classes = _state.classes;
        var index = 0;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                console.log("did we make it class???", classes[i].name)
                classes[i].switchClass(classes[i].chosen)
                index = i;
            }
        }
        console.log("class choice flip, this should be true: ", _state.classes[index].chosen)
    }

    chooseClass(classIndex) {
        let classes = _state.classes;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                _setState('class', new CharacterClass(classes[i]))
                break
            }
        }
        this.flipChosenClass(classIndex)
        this.chooseProficiencies()
    //    this.classProficiencies()
    }

    chooseProficiencies() {
        var classProficiencies = _state.character.class.proficiencies
        var chooseProficiencies = _state.character.class.proficiency_choices
        console.log("CCLLAASS PROFICIENCIES", classProficiencies)
        console.log("CHOOSE CCLLAASS PROFICIENCIES", chooseProficiencies)
        for (var i = 0; i < chooseProficiencies.length; i++) {
            
        }
    }
    
    classProficiencies() {
        var proficiencies = _characterProficienciesService.classProficiencies
        var characterClass = _state.character.class

        console.log("WHATTTT", characterClass)
        /*
        for (var i = 0; i < characterClass.) {
            for (var j = 0; j < proficiencies[i].classes.length; j++) {
                if (proficiencies[i].classes[j].name == className) {
                    console.log("SETTING CLASS PROFICIENCEIS", proficiencies[i])
                    _setState('classProficiencies', new CharacterProficiency(proficiencies[i]))
                }
            }
        }*/
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

    replaceClass(classIndex) {
        let classes = _state.classesInfo;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                _replaceInState('class', new CharacterClass(classes[i]))
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
    getAllClasses() {
        console.log('Conjuring the champion classes of Faerun.')
        characterApi.get("/classes/")
            .then(res => {
             //   console.log('All the classes of Fearun: ', res.data)
                _setState('classSelection', new CharacterClasses(res.data))
                this.fillClassSelection();
            }).catch(err => {
                console.log("Error requesting ALL Classes: ", err)
                //_setState('error', err.response.data)
            })
    }

    getSpecificClass(url) {
        console.log('Requesting specific class information.')
        characterApi.get(url)
            .then(res => {
               // console.log('Class information: ', res.data)
                _setState('classes', new CharacterClass(res.data))
            }).catch(err => {
                console.log("Error requesting specific class info: ", err)
            })
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
