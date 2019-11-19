import CharacterProficiencies from "../../models/character-proficiencies.js";
import CharacterProficiency from "../../models/character-proficiency.js";

// @ts-ignore
const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _state = {
    proficienciesList: {},
    proficiency: []
}
/*
let _subscribers = {
    proficiencies: [],
    proficiencyInfo:[]
}*/

function _setState(prop, data) {
    if (prop == 'proficiency') {
        _state[prop].push(data)
    } else {
        _state[prop] = data
    }
  // _subscribers[prop].forEach(fn => fn());
}

export default class CharacterProficienciesService {

    get Proficiencies() { return _state.proficienciesList }

    get Proficiency() { return _state.proficiency }
    
    proficiencyInfo() {
        var proficiencies = _state.proficienciesList;
        for (var i = 0; i < 10; i++) {
            this.getSpecificProficiency(proficiencies.results[i].url)
        }
    }

    getAllProficiencies() {
    characterApi.get('/proficiencies/')
        .then(res => {
           // console.log("Proficiencies", res.data);
            _setState('proficienciesList', new CharacterProficiencies(res.data))
            this.proficiencyInfo();
        }).catch(err => {
            console.log("Error requesting proficiencies: ", err)
        })
    }

    getSpecificProficiency(url) {
        characterApi.get(url)
            .then(res => {
             //   console.log("Specific Proficiency", res.data)
                _setState('proficiency', new CharacterProficiency(res.data))    
            }).catch(err => {
                console.log("Error requesting a specific proficiency")
            })
    }
}