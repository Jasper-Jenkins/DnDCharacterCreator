import CharacterProficiencies from "../../models/character-proficiencies.js";
import CharacterProficiency from "../../models/character-proficiency.js";

// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _state = {
    proficienciesList: {},
    proficiencies: []
}

/*
    let _subscribers = {
        proficiencies: [],
        proficiencyInfo:[]
    }
*/

function _setState(prop, data) {
    if (prop == 'proficiencies') {
        _state[prop].push(data)
    } else {
        _state[prop] = data
    }
  // _subscribers[prop].forEach(fn => fn());
}

export default class CharacterProficienciesService {

    get ProficienciesList() { return _state.proficienciesList }

    get Proficiencies() { return _state.proficiencies }
    
    proficiencyInfo() {
        var proficiencies = _state.proficienciesList;
        for (var i = 0; i < proficiencies.count; i++) {
            this.getSpecificProficiency(proficiencies.results[i].url)
        }
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