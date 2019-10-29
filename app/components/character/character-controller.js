import CharacterService from "./character-service.js";

const _characterService = new CharacterService();

function drawRaces() {
    var races = _characterService.Races;
    var template = '';
    for (var i = 0; i < races.count; i++) {
        template += `<div class="col race text-center" onclick="app.controllers.characterController.raceInfo('${races.results[i].name}')">
                         <p>${races.results[i].name}</p>   
                     </div>`
        _characterService.getSpecificRace(races.results[i].url);
    }   
    document.getElementById('chooseRace').innerHTML = template;
}

function drawSpecificRace(raceName) {
    var race = _characterService.RacesInfo;
    var template = '';
    for (var i = 0; i < race.length; i++) {
        if (race[i].name == raceName) {
            var raceChoice = race[i];
            console.log("RACE CHOICE: ", raceChoice)
            console.log("Race info: ", race[i]);
            template += `<div class="col-12">
                            <p class="close" onclick="app.controllers.characterController.closeInfo()">Close</p>
                            <p>Race: ${race[i].name}</p>
                            <p>Ability Bonuses: ${race[i].ability_bonuses[0]}, ${race[i].ability_bonuses[1]}, ${race[i].ability_bonuses[2]}, ${race[i].ability_bonuses[3]}, ${race[i].ability_bonuses[4]}, ${race[i].ability_bonuses[5]}</p>
                            <p>Size: ${race[i].size} </p>
                            <p>Alignment: ${race[i].alignment}</p>
                            <div class="row text-center" onclick="app.controllers.characterController.chooseRace(${race[i].index})">
                                <div class="col-12"> 
                                    <p id="chooseRace">Choose ${race[i].name}</p>
                                </div>    
                            </div>
                         </div>`
        }
    }
    document.getElementById('raceInfo').innerHTML = template;
}


function drawClasses() {
    console.log("Service when drawClasses is called:", _characterService)

    var races = _characterService.Races;
    var template = '';

    for (var i = 0; i < races.count; i++) {
        template += `<div class="col race text-center">${races.results[i].name}</div>`
    }
    document.getElementById('chooseRace').innerHTML = template;
}

export default class CharacterController {

    constructor() {
        _characterService.addSubscriber('races', drawRaces);
     // _characterService.addSubscriber('race', drawSpecificRace);
        _characterService.getAllRaces();
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

    raceInfo(raceName) {
        drawSpecificRace(raceName);
        document.getElementById('raceInfo').style.visibility='visible'
    }

    closeInfo() {
        document.getElementById('raceInfo').style.visibility = 'hidden'
    }

    chooseRace(race) {
        _characterService.RacesInfo;
        console.log("DO I HAVE AN OBJECT? -- ", race)
        //_characterService.get
    }

    
}
