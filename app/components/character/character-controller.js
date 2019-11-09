import CharacterService from "./character-service.js";
import CharacterRace from "../../models/character-race.js";

const _characterService = new CharacterService();

function drawRaceSelection() {
    var races = _characterService.Races;
    var template = '';
    template += races.Template;
    document.getElementById('raceSelection').innerHTML = template;
}

function drawRaceInfo(raceName) {
    var race = _characterService.RacesInfo;
    var template = '';
    for (var i = 0; i < race.length; i++) {
        if (race[i].name == raceName) {
            template += race[i].Template;
            document.getElementById('raceInfo').innerHTML = template;
            break;
        }
    }
}

function drawClassSelection() {
    var classes = _characterService.Classes;
    var template = '';
    template += classes.Template;
    document.getElementById('classSelection').innerHTML = template;
}

function drawClassInfo(className) {
    var cClass = _characterService.ClassesInfo;
    var template = '';
    for (var i = 0; i < cClass.length; i++) {
        if (cClass[i].name == className) {
            console.log("eureka");
            template += cClass[i].Template;
            document.getElementById('classInfo').innerHTML = template;
            break;
        }
    }
}




function drawAbilityScoresSelection() {
    var scores = _characterService.AbilityScores;
    var template = '';
    template += scores.Template;
    document.getElementById('abilityScoreSelection').innerHTML = template;
}



function drawCharacterProgress() {
    var character = _characterService.Character;
    var template = '';
  /*  for (var j = 0; j < character.length; j++) {
        if (character[0].details instanceof CharacterRace) {
            console.log("PROGRESS IS BEING MADE")
            template += `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreens('raceSelection', ['alert', 'classSelection', 'abilityScoreSelection, 'raceInfo', 'classInfo'])">${character[i].details.name}</div> `
        }
    }*/
    console.log("CHARACTER", character)
    for (var i = 0; i < character.length; i++) {
        template +=
            `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreen(${i})">${character[i].details.name}</div> `
    } 
    document.getElementById('characterProgress').innerHTML = template;
}

function drawChooseAnotherRace(newRace) {
    var template = '';
    var character = _characterService.Character;
    if (character[0].details.name == newRace.name) {
        template += `<div class="col-12"><p>You already have ${character[0].details.name} chosen as a race.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.swapScreens('abilityScoreSelection', ['alert', 'raceSelection'])"><p>Choose another</p></div>
                     </div>`   
    } else {
        template += `<div class="col-12"><p>You already have chosen ${character[0].details.name} as a race. Would you rather be ${newRace.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.chooseAnotherRace(${newRace.index})"><p>Change to ${newRace.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Continue as ${character[0].details.name}</p></div>
                     </div>`
    }                
    document.getElementById('alert').innerHTML = template;
}

function drawChooseAnotherClass(newClass) {
    var template = '';
    var character = _characterService.Character;
    if (character[1].details.name == newClass.name) {
        template += `<div class="col-12"><p>You already have ${character[1].details.name} chosen as a race.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Choose another</p></div>
                     </div>`
    } else {
        template += `<div class="col-12"><p>You already have chosen ${character[1].details.name} as a race. Would you rather be ${newClass.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.chooseAnotherClass(${newClass.index})"><p>Change to ${newClass.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.swapScreens('abilityScoreSelection', ['alert', 'classSelection'])"><p>Continue as ${character[1].details.name}</p></div>
                     </div>`;
    }

    document.getElementById('alert').innerHTML = template;
}

function randomNumber() {
    var abilityPoints = 0;
    for (var i = 0; i < 3; i++) {
        abilityPoints += Math.floor((Math.random() * 6) + 1);       
    }
    return abilityPoints;
}


export default class CharacterController {

    constructor() {
        _characterService.addSubscriber('races', drawRaceSelection);
        _characterService.addSubscriber('classes', drawClassSelection);
        _characterService.addSubscriber('abilityScores', drawAbilityScoresSelection);
        _characterService.getAllRaces();
        _characterService.getAllClasses();
        _characterService.getAllAbilityScores();
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
        this.showInfo('raceInfo');
    }

    classInfo(className) {
        drawClassInfo(className);
        this.showInfo('classInfo');
    }



    chooseRace(raceIndex) {
        var raceCheck = _characterService.Character;
        var newRace = _characterService.RacesInfo;
        if (raceCheck[0] == undefined) {
            _characterService.chosenRace(raceIndex);
            this.swapScreens("classSelection", ["raceInfo", "raceSelection", "alert"])
        } else {
            for (var i = 0; i < newRace.length; i++) {
                if (newRace[i].index == raceIndex) {
                    drawChooseAnotherRace(newRace[i]);
                    this.swapScreens("alert", [])

                }
            }
        }
        drawCharacterProgress();
    }
           
    chooseAnotherRace(raceIndex) {
        _characterService.replaceRace(raceIndex);
        drawCharacterProgress();
        this.swapScreens("classSelection", ["alert", "raceSelection"]);
    }
        
    chooseClass(classIndex) {
        var classCheck = _characterService.Character;
        var newClass = _characterService.ClassesInfo;
        if (classCheck[1] == undefined) {
            _characterService.chosenClass(classIndex);
            this.swapScreens("abilityScoreSelection", ["classInfo","classSelection", "alert"])
        } else {
            for (var i = 0; i < newClass.length; i++) {
                if (newClass[i].index == classIndex) {
                    drawChooseAnotherClass(newClass[i]);
                    
                    this.swapScreens("alert", ["classInfo"])
                }
            }
        }
        drawCharacterProgress();
    }

    chooseAnotherClass(classIndex) {
        _characterService.replaceClass(classIndex);
        drawCharacterProgress();
        this.swapScreens('abilityScoreSelection', ['alert','classSelection'])
       
    }

    showInfo(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 5;
        document.getElementById(elementToShow).style.visibility = "visible";
    }

    show(elementToShow) {
        console.log("Showing HTML div element: ", elementToShow)
        document.getElementById(elementToShow).style.zIndex = 1;
        document.getElementById(elementToShow).style.visibility = "visible";
    }

    hide(elementToHide) {
        console.log("Closing HTML div element: ", elementToHide)
        document.getElementById(elementToHide).style.zIndex = 0;
        document.getElementById(elementToHide).style.visibility = "hidden";
    }

    swapScreens(showId, hideIds) {
        var progressBar = ["alert", "raceSelection", "raceInfo", "classSelection", "classInfo", "abilityScoreSelection"];
        var check = 0;
        for (var i = 0; i < progressBar.length; i++) {
            for (var j = 0; j < hideIds.length; j++) {
                if (hideIds[j] == progressBar[i]) {
                    //console.log("CLOSING")
                    this.hide(hideIds[j])
                    check++
                }
                if (check == hideIds.length) {
                    //console.log("DID IT??")
                    break;
                }
            }
            if (check == hideIds.length) {
                break;
            }
            console.log("Iterating swap screen")
        }
        if (showId == "alert") {
            this.showInfo(showId)
        } else {
            this.show(showId)
        }
    }

    swapScreen(index) {
        var progressBar = ["raceSelection", "classSelection", "abilityScoreSelection"];

        for (var i = 0; i < progressBar.length; i++) {
            if (i == index) {
                this.show(progressBar[i])
            } else {
                this.hide(progressBar[i])
            }
        }
    }
    
    generateAbilityScores() {
        var abilityScores = _characterService.AbilityScores;
        for (var i = 0; i < abilityScores.count; i++){
            this.generateAbilityScore(abilityScores.results[i].name)
        }
    }
    
    generateAbilityScore(ability) {
        var num = randomNumber();
        document.getElementById(ability.toLowerCase()).innerHTML = num;
        this.setAbilityScore(ability, num)
    }

    saveAbilityScores() {
        var abilityScores = _characterService.AbilityScoresInfo
        for (var i = 0; i < abilityScores.length; i++) {
            console.log(abilityScores[i].full_name, abilityScores[i].points)
        }
    }

    setAbilityScore(ability, num) {
        _characterService.setAbilityScore(ability, num)
    }


}
;