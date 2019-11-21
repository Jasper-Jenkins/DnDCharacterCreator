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
import CharacterProficiency from "../../models/character-proficiency.js"

import CharacterProficienciesService from "./character-proficiencies-service.js"

const _characterProficienciesService = new CharacterProficienciesService(); 

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
    races: {},
    racesInfo: [],
    //race: {},
    classes: {},
    classesInfo: [],
    //  class: {},
    abilityScoresData: {},
    abilityScoresInfo: [],
    levels: {},
    proficiencies: [],
    classProficiencies: []
}

let _subscribers = {
    character: [],
    races: [],
    racesInfo: [],
    race: [],
    classes: [],
    classesInfo: [],
    class: [],
    abilityScores:[],
    abilityScoresData: [],
    abilityScoresInfo: [],
    proficiencies: [],
    classProficiencies: []
}


function _setState(prop, data) {
    if (prop == "racesInfo" || prop == "classesInfo" || prop == "abilityScoresInfo" || prop == "proficiencies" || prop == "classProficiencies") {
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

export default class CharacterService {

    constructor() {
        _characterProficienciesService.getAllProficiencies();
    }

    get Character() { return _state.character }
           
    get Races() { return _state.races; }

    get RacesInfo() { return _state.racesInfo; }

    //get Race() { return _state.race; }
    
    get Classes() { return _state.classes }

    get ClassesInfo() { return _state.classesInfo }

    //get Class() { return _state.class }  

    get AbilityScores() { return _state.abilityScoresData }

    get AbilityScoresInfo() { return _state.abilityScoresInfo }

    get AbilityScoreData() { return _state.abilityScoreData }


    get Proficiencies() { return _state.proficiencies }


    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    chosenRace(raceIndex) {
        let races = _state.racesInfo; 
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
                _setState('race', new CharacterRace(races[i]))
            }
        }
    //    this.setProficiencies();
    }

    flipChosenRace(raceIndex) {
        let races = _state.racesInfo;
        var index = 0;
        for (var i = 0; i < races.length; i++) {
            if (races[i].index == raceIndex) {
               // console.log("did we make it???", races[i].name)
                races[i].switchRace(races[i].chosen)
                index = i;
            }
        }
        console.log("This should be true: ", _state.racesInfo[index].chosen)
    }

    flipChosenClass(classIndex) {
        let classes = _state.classesInfo;
        var index = 0;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                console.log("did we make it class???", classes[i].name)
                classes[i].switchClass(classes[i].chosen)
                index = i;
            }
        }
        console.log("This should be true: ", _state.classesInfo[index].chosen)
    }



     
     
    chosenClass(classIndex) {
        let classes = _state.classesInfo;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].index == classIndex) {
                _setState('class', new CharacterClass(classes[i]))
            }
        }
    }
    
    setProficiencies() {
        var proficiency = _characterProficienciesService.Proficiency
      //  console.log("SETTING PROFICIENCIES TO SERVICE STATE: ", proficiencies)
        for (var i = 0; i < proficiency.length; i++) {
 //           console.log("proficiency Info", proficiency[i].name)
            _setState('proficiencies', new CharacterProficiency(proficiency[i]))
        }
    }

    setClassProficiencies(className) {
        var proficiencies = _characterProficienciesService.Proficiency
        for (var i = 0; i < proficiencies.length; i++) {
            for (var j = 0; j < proficiencies[i].classes.length; j++) {
                if (proficiencies[i].classes[j].name == className) {
                    console.log("SETTING CLASS PROFICIENCEIS", proficiencies[i])
                    _setState('classProficiencies', new CharacterProficiency(proficiencies[i]))
                }
            }
        }
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


    getAllRaces() {
        console.log('Requesting the races of Faerun from the DnD API')
        characterApi.get("/races/")
            .then(res => {
                _setState('races', new CharacterRaces(res.data))
                this.fillRaceSelection();    
            })                    
            .catch(err => {
                console.log("Error requesting ALL races: ", err)
                //_setState('error', err.response.data)
            })
    }

    getSpecificRace(url) {
        console.log('Requesting specific race information.')
        characterApi.get(url)
            .then(res => {
              //  console.log('Race information: ', res.data)
                _setState('racesInfo', new CharacterRace(res.data))            
            })
            .catch(err => {
                console.log("Error requesting a SINGLE race: ", err)
                //_setState('error', err.response.data)
            })
    }

    getAllClasses() {
        console.log('Conjuring the champion classes of Faerun.')
        characterApi.get("/classes/")
            .then(res => {
             //   console.log('All the classes of Fearun: ', res.data)
                _setState('classes', new CharacterClasses(res.data))
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
                _setState('classesInfo', new CharacterClass(res.data))
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
