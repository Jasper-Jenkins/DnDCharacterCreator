import CharacterService from "./character-service.js";

const _characterService = new CharacterService()

function drawCharacter() {
    console.log("The Character info:", _characterService)
    var characters = _characterService.Characters;


    var template = '';

    template += ``
       
    document.getElementById('character').innerHTML = template;
}

export default class CharacterController {

    constructor() {
        _characterService.addSubscriber('character', drawCharacter)
        _characterService.getCharacters()
    }

    chooseName(e) {
        e.preventDefault()
        var form = e.target
        console.log("Response from the Character GET on DnD api:", e.target)
        var characterName = {
           name: form.characterName.value
        }
        form.reset()
        console.log("Name Chosen by the player: ", characterName)
    }

    
}
