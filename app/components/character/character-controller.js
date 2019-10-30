import CharacterService from "./character-service.js";

const _characterService = new CharacterService();

function drawRaces() {
    var races = _characterService.Races;
    var template = '';
    for (var i = 0; i < races.count; i++) {
        template += `<div class="col characterRace text-center" onclick="app.controllers.characterController.raceInfo('${races.results[i].name}')">
                        <p>${races.results[i].name}</p> 
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                        </div>
                     </div>`
        _characterService.getSpecificRace(races.results[i].url);
    }   
    document.getElementById('raceSelection').innerHTML = template;
}

function drawRaceInfo(raceName) {
    var race = _characterService.RacesInfo;
    var template = '';
    for (var i = 0; i < race.length; i++) {
        if (race[i].name == raceName) {
              template += `<div class="col-12">
                            <p class="close" onclick="app.controllers.characterController.close('raceInfo')">Close</p>
                            <p>Race: ${race[i].name}</p>
                            <p>Ability Bonuses: STR +${race[i].ability_bonuses[0]}, DEX +${race[i].ability_bonuses[1]}, CON +${race[i].ability_bonuses[2]}, INT +${race[i].ability_bonuses[3]}, WIS +${race[i].ability_bonuses[4]}, CHA +${race[i].ability_bonuses[5]}</p>
                            <p>Size: ${race[i].size} </p>
                            <p>Alignment: ${race[i].alignment}</p>
                            <div class="row text-center" onclick="app.controllers.characterController.chooseRace(${race[i].index})">
                                <div class="col-12" id="chooseRace"> 
                                    <p>Choose ${race[i].name}</p>
                                </div>    
                            </div>
                         </div>`
            document.getElementById('raceInfo').innerHTML = template;
            break;
        }
    }
}


function drawClasses() {
    var classes = _characterService.Classes;
    var template = '';
        
    for (var i = 0; i < classes.count; i++) {
        template += `<div class="col characterClass text-center" onclick="app.controllers.characterController.classInfo('${classes.results[i].name}')">
                         <p>${classes.results[i].name}</p>   
                     </div>`
        _characterService.getSpecificClass(classes.results[i].url);
    }
    document.getElementById('classSelection').innerHTML = template;
}


function drawClassInfo(className) {
    var cClass = _characterService.ClassesInfo;
    var template = '';
    console.log(cClass)
    for (var i = 0; i < cClass.length; i++) {
        console.log(cClass[i].name + " and " + className)
        if (cClass[i].name == className) {
            console.log("eureka");
            template += `<div class="col-12">
                            <p class="close" onclick="app.controllers.characterController.close('classInfo')">Close</p>
                            <p> Class: ${cClass[i].name} </p>
                            <p> Hit die: ${cClass[i].hit_die} </p>
                            <p> GIibberish trying to find out why the class choice div is not going across the whole screen. I suspect its from the content and needs to have more so that it will go across the screen.
                            <div class="row text-center" onclick="app.controllers.characterController.chooseClass(${cClass[i].index})">
                                <div class="col-12" id="chooseClass"> 
                                    <p>Choose ${cClass[i].name}</p>
                                </div>    
                            </div>
                         </div>`
            document.getElementById('classInfo').innerHTML = template;
            break;
        }
    }
}

function drawCharacterProgress() {
    var character = _characterService.Character;
    console.log("CHARACTER", character);
    var template = '';
    for (var i = 0; i < character.length; i++) {
        template += `<div class="col-2 characterProgress">${character[i].details.name}</div> `
    }
    document.getElementById('characterProgress').innerHTML = template;
}

function drawChooseAnotherRace(newRace) {
    var template = '';
    var character = _characterService.Character;

    if (character[0].details.name == newRace.name) {
        template += `<div class="col-12"><p>You already have ${character[0].details.name} chosen as a race.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.close('alert')"><p>Choose another</p></div>
                     </div>`   
    } else {

        template += `<div class="col-12"><p>You already have chosen ${character[0].details.name} as a race. Would you rather be ${newRace.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace"><p>Change to ${newRace.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.close('alert')"><p>Continue as ${character[0].details.name}</p></div>
                     </div>`;

    }
                
    document.getElementById('alert').innerHTML = template;
    document.getElementById('alert').style.visibility = "visible";
}

function drawAlert(message) {
    var template = '';
    template += `<div class="col-12"> <p>${message}</p> </div><div class="close">X</div>`
    document.getElementById('alert').innerHTML = template;
}

export default class CharacterController {

    constructor() {
        _characterService.addSubscriber('races', drawRaces);
        _characterService.addSubscriber('classes', drawClasses);
     // _characterService.addSubscriber('race', drawSpecificRace);
        _characterService.getAllRaces();
        _characterService.getAllClasses();
    }

    /*chooseName(e) {
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
        drawRaceInfo(raceName);
        document.getElementById('raceInfo').style.visibility = 'visible';
    }

    classInfo(className) {
        drawClassInfo(className);
        document.getElementById('classInfo').style.visibility = 'visible';
    }
    
    chooseAnotherRace() {

    }

    close(elementToHide) {
        document.getElementById(elementToHide).innerHTML = '';
        document.getElementById(elementToHide).style.visibility = "hidden";
    }
   
    chooseRace(raceIndex) {
        var raceCheck = _characterService.Character;
        var newRace = _characterService.Races;

        if (raceCheck[0] == undefined) {
            _characterService.chosenRace(raceIndex);
        } else {
            console.log("NEW RACE", newRace.results[raceIndex-1].name)

            console.log("RACE INDEX", raceIndex)
            drawChooseAnotherRace(newRace.results[raceIndex-1]);
            //closeAlert();
            //drawAlert("You done messsed up A-A-ron!");   
        }
        drawCharacterProgress();
        this.close("raceInfo");
    }

    chooseClass(classIndex) {
        _characterService.chosenClass(classIndex);
        drawCharacterProgress();
        this.close("classInfo");
    }
    
}
