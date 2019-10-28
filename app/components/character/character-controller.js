import CharacterService from "./character-service.js";

const _characterService = new CharacterService()

function drawRaces() {
    console.log("Service when drwaRaces is called:", _characterService)
    var races = _characterService.Races;
    
    var template = '';
    for (var i = 0; i <races.count ; i++) {

        template += `<div class="col race text-center"><p>${races.races[i].name}</p></div>`

    }   
    document.getElementById('chooseRace').innerHTML = template;
}

function drawClasses() {
    console.log("Service when drawClasses is called:", _characterService)
    var races = _characterService.Races;

    var template = '';
    for (var i = 0; i < races.count; i++) {

        template += `<div class="col race text-center">${races.races[i].name}</div>`

    }
    document.getElementById('chooseRace').innerHTML = template;
}

export default class CharacterController {

    constructor() {
        _characterService.addSubscriber('races', drawRaces)
        _characterService.getAllRaces()
    }
    /*
    chooseName(e) {
        e.preventDefault()
        var form = e.target
        console.log("Response from the Character GET on DnD api:", e.target)
        var characterName = {
           name: form.characterName.value
        }
        form.reset()
        console.log("Name Chosen by the player: ", characterName)
    }*/

    
}
