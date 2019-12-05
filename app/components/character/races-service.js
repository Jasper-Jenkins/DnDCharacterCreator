import CharacterRaces from "../../models/character-races.js"
import CharacterRace from "../../models/character-race.js"


console.log("1")
// @ts-ignore
const raceApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _racesState = {
    raceSelection: {},
    races: []
}

let _raceSubscribers = {
    raceSelection: [],
    races: []
}

function _setRacesState(prop, data) {
    if (prop == 'races') {
        _racesState[prop].push(data)
    } else {
        _racesState[prop] = data
    }
    _raceSubscribers[prop].forEach(fn => fn());
}

export default class RacesService {

    get RaceSelection() { return _racesState.raceSelection } 

    get Races() { return _racesState.races }

    addRaceSubscriber(prop, fn) {
        _raceSubscribers[prop].push(fn)
    }

    fillRaces() {
        var races = _racesState.raceSelection
     //   console.log("race selection fill", races)
        for (var i = 0; i < races.count; i++) {
            //console.log(races.results[i].name)
            this.getSpecificRace(races.results[i].url)
        }
    }

    allRaces() {
        console.log('Requesting the races of Faerun from the DnD API')
        raceApi.get("/races/")
            .then(res => {
             //   _setState('racesSelection', res.data)
          //      console.log("RACE DATA", res.data)
                _setRacesState('raceSelection', new CharacterRaces(res.data))
      //          this.racesSelection = new CharacterRaces(res.data)
                this.fillRaces()
            })
            .catch(err => {
                console.log("Error requesting ALL races: ", err)
                //_setState('error', err.response.data)
            })
    }

    getSpecificRace(url) {
        console.log('Requesting specific race information.')
        raceApi.get(url)
            .then(res => {
         //        console.log('Race information: ', res.data)
                _setRacesState('races', new CharacterRace(res.data))
            //    this.races.push(new CharacterRace(res.data))
            })
            .catch(err => {
                console.log("Error requesting a SINGLE race: ", err)
                //_setState('error', err.response.data)
            })
    }
}