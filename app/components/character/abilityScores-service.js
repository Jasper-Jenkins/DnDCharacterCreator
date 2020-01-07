import CharacterAbilityScores from "../../models/character-abilityscores.js"
import CharacterAbilityScore from "../../models/character-abilityscore.js"

// @ts-ignore
const abilityScoresApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/",
    timeout: 3000
})

let _abilityScoresState = {
    abilityScoresSelection: {},
    abilityScoresData: []
}

let _abilityScoresSubscribers = {
    abilityScoresSelection: [],
    abilityScoresData: []
}

function _setAbilityScoresState(prop, data) {

    if (prop == 'abilityScoresData') {
        _abilityScoresState[prop].push(data)
    } else {
        console.log("Ability Scores Selection", data)
        _abilityScoresState[prop] = data
    }
    _abilityScoresSubscribers[prop].forEach(fn => fn());
}

export default class AbilityScoresService {

    get AbilityScoresSelection() { return _abilityScoresState.abilityScoresSelection }

    get AbilityScoresData() { return _abilityScoresState.abilityScoresData }

    addAbilityScoresSubscriber(prop, fn) {
        _abilityScoresSubscribers[prop].push(fn)
    }
    
    fillAbilityScores() {
        var abilityScores = _abilityScoresState.abilityScoresSelection
        for (var i = 0; i < abilityScores.count; i++) {
            this.specificAbilityScore(abilityScores.results[i].url)
        }
    }

    allAbilityScores() {
        abilityScoresApi.get('api/ability-scores/')
            .then(res => {
                _setAbilityScoresState('abilityScoresSelection', new CharacterAbilityScores(res.data))
                this.fillAbilityScores()
            }).catch(err => {
                console.log("Error requesting all ability scores: ", err)
            })
    }

    specificAbilityScore(url) {
        abilityScoresApi.get(url)
            .then(res => {
                _setAbilityScoresState('abilityScoresData', new CharacterAbilityScore(res.data))
            }).catch(err => {
                console.log("Error requesting specific ability score", err)
            })
    }

}