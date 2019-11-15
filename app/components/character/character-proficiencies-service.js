import CharacterProficiencies from "../../models/character-proficiencies.js";
import CharacterProficiency from "../../models/character-proficiency.js";

const characterApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _state = {
    proficiencies: {},
    proficiencyInfo: []
}

let _subscribers = {
    proficiencies: [],
    proficiencyInfo:[]
}

function _setState(prop, data) {
    if (prop == 'proficiencyInfo') {
        _state[prop].push(data)
    } else {
        _state[prop] = data
    }
   _subscribers[prop].forEach(fn => fn());
}

export default class CharacterProficienciesService {

    get Proficiencies() { return _state.proficiencies }

    get ProficiencyInfo() { return _state.proficiencyInfo }
    
    proficiencyInfo() {
        var proficiencies = _state.proficiencies;
        for (var i = 0; i < 10; i++) {
            this.getSpecificProficiency(proficiencies.results[i].url)
        }
    }

    getAllProficiencies() {
    characterApi.get('/proficiencies/')
        .then(res => {
           // console.log("Proficiencies", res.data);
            _setState('proficiencies', new CharacterProficiencies(res.data))
            this.proficiencyInfo();
        }).catch(err => {
            console.log("Error requesting proficiencies: ", err)
        })
    }

    getSpecificProficiency(url) {
        characterApi.get(url)
            .then(res => {
             //   console.log("Specific Proficiency", res.data)
                _setState('proficiencyInfo', new CharacterProficiency(res.data))    
            }).catch(err => {
                console.log("Error requesting a specific proficiency")
            })
    }
}