import CharacterProficiencies from "../../models/character-proficiencies.js";
import CharacterProficiency from "../../models/character-proficiency.js";

// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _state = {
    proficienciesList: {},
    classProficiencies: [],
    proficiencies: []
}


let _subscribers = {
    proficienciesList: [],
    proficiencies: [],
    proficiencyInfo:[]
}


function _setState(prop, data) {
    if (prop == 'proficiencies' || prop == 'classProficiencies') {
        _state[prop].push(data)
    } else {
        _state[prop] = data
    }
    _subscribers[prop].forEach(fn => fn());
}

export default class ProficienciesService {

    get ProficienciesList() { return _state.proficienciesList }

    get Proficiencies() { return _state.proficiencies }

    get ClassProficiencies() { return _state.classProficiencies }
    
    proficiencyInfo() {
        var proficiencies = _state.proficienciesList;
        for (var i = 0; i < proficiencies.count; i++) {
            this.getSpecificProficiency(proficiencies.results[i].url)
        }
    }

    chooseProficiency(chosenClass) {
        var proficiencyChoices = chosenClass.proficiency_choices;
      //  var chosenClass 
    }

 
    getAllProficiencies() {
    characterApi.get('/proficiencies/')
        .then(res => {
               //new CharacterProficiencies(res.data)
            console.log("Proficiencies", res.data)
            _setState('proficienciesList', res.data)
        //    this.proficiencyInfo();
        }).catch(err => {
            console.log("Error requesting all proficiencies: ", err)
        })

    }

    classProficiencies(url) {
        characterApi.get(url).then(res => {
            console.log("Class proficiencies", res)
            _setState('classProficiencies', res.data)
        }).catch(err => {console.log("Error requesting class proficiencies". err)})
    }
       
    getSpecificProficiency(url) {
        characterApi.get(url)
            .then(res => {
                console.log("Specific Proficiency", res.data)
                _setState('proficiencies', res.data)    
            }).catch(err => {
                console.log("Error requesting a specific proficiency", err)
            })
    }

    
}