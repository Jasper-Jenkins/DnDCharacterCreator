import CharacterService from "./character-service.js";
import CharacterRace from "../../models/character-race.js";
import CharacterClass from "../../models/character-class.js";
import CharacterAbilityScore from "../../models/character-abilityscore.js";

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
          //  console.log(template)
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
    var templateTwo = '';

    template += scores.Template;
    document.getElementById('abilityScoreInfo').innerHTML = template;

    templateTwo += scores.ScoreSelectorTemplate;
    templateTwo += `<div class="col-12 text-center" onclick="app.controllers.characterController.generateAbilityScores()">
                         <p>Generate All scores</p>
                     </div>
                     <div class="col-12 text-center" onclick="app.controllers.characterController.saveAbilityScores()">
                         <p>Save scores</p>
                     </div>   
                     `
    
    document.getElementById('abilityScoreSelection').innerHTML = templateTwo;
}


function drawCharacterProgress() {
    var character = _characterService.Character;
    var template = '';
    console.log("CHARACTER", character)
    for (var j = 0; j < character.length; j++) {
        if (character[j].details instanceof CharacterRace) {
           // console.log("PROGRESS IS BEING MADE in race")
            template += `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreens('raceCreation', ['alert', 'classCreation', 'abilityScoreCreation', 'raceInfo'])">${character[j].details.name}</div> `
        }
        if (character[j].details instanceof CharacterClass) {
            //console.log("PROGRESS IS BEING MADE in class")
            template += `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreens('classCreation', ['alert', 'raceCreation', 'abilityScoreCreation', 'classInfo'])">${character[j].details.name}</div> `
        }
        if (character[j].details[0] instanceof CharacterAbilityScore) {
            //console.log("PROGRESS IS BEING MADE in ability scores")
            template += `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreens('abilityScoreCreation', ['alert', 'raceCreation', 'classCreation'])">Ability Scores</div> `
        }
    }   
    document.getElementById('characterProgress').innerHTML = template;
}

function drawChooseAnotherRace(newRace) {
    var template = '';
    var character = _characterService.Character;
    if (character[0].details.name == newRace.name) {
        template += `<div class="col-12"><p>You already have ${character[0].details.name} chosen as a race.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.swapScreens('abilityScoreCreation', ['alert', 'raceCreation'])"><p>Choose another</p></div>
                     </div>`   
    } else {
        template += `<div class="col-12"><p>You already have chosen ${character[0].details.name} as a race. Would you rather be ${newRace.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.chooseAnotherRace(${newRace.index})"><p>Change to ${newRace.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.swapScreens('classCreation', ['alert', 'raceCreation'])"><p>Continue as ${character[0].details.name}</p></div>
                     </div>`
    }                
    document.getElementById('alert').innerHTML = template;
}

function drawChooseAnotherClass(newClass) {
    var template = '';
    var character = _characterService.Character;
    if (character[1].details.name == newClass.name) {
        template += `<div class="col-12"><p>You already have ${character[1].details.name} chosen as a class.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Choose another</p></div>
                     </div>`
    } else {
        template += `<div class="col-12"><p>You already have chosen ${character[1].details.name} as a race. Would you rather be ${newClass.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.chooseAnotherClass(${newClass.index})"><p>Change to ${newClass.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.swapScreens('abilityScoreCreation', ['alert', 'classCreation'])"><p>Continue as ${character[1].details.name}</p></div>
                     </div>`;
    }

    document.getElementById('alert').innerHTML = template;
}

function randomDSix() {
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

    disableSelection(raceIndex) {
        var races = _characterService.RacesInfo;
        var raceSelection = _characterService.Races;
        var template = ''
        for (var i = 0; i < races.length; i++) {
            if (raceIndex == races[i].index) {
                template += raceSelection.disableSelection(races[i].name)
            }
        }
        document.getElementById('raceSelection').innerHTML = template;
        console.log("RACES", races)
    }

    chooseRace(raceIndex) {
        var raceCheck = _characterService.Character;
        var newRace = _characterService.RacesInfo
        if (raceCheck[0] == undefined) {
            _characterService.chosenRace(raceIndex);
            this.swapScreens("classCreation", ["raceCreation", "alert"])
            this.disableSelection(raceIndex)
        } else {
            for (var i = 0; i < newRace.length; i++) {
                if (newRace[i].index == raceIndex) {
                    drawChooseAnotherRace(newRace[i])
                    this.swapScreens("alert", [])
                }
            }
        }
        drawCharacterProgress();
    }
           
    chooseAnotherRace(raceIndex) {
        console.log("RACE INDEX", raceIndex)
        _characterService.replaceRace(raceIndex);
        drawCharacterProgress();
        this.swapScreens("classCreation", ["alert", "raceCreation"]);
        this.disableSelection(raceIndex)
    }
        
    chooseClass(classIndex) {
        var classCheck = _characterService.Character;
        var newClass = _characterService.ClassesInfo;
        if (classCheck[1] == undefined) {
            _characterService.chosenClass(classIndex);
            this.swapScreens("abilityScoreCreation", ["classCreation", "alert"])
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
        this.swapScreens('abilityScoreCreation', ['alert','classCreation'])
       
    }

    showInfo(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 2;
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
        var divElementIds = ["alert","classCreation", "raceCreation", "abilityScoreCreation", "raceSelection", "raceInfo", "classSelection", "classInfo", "abilityScoreSelection", "abilityScoreInfo"];
        var check = 0;
        for (var i = 0; i < divElementIds.length; i++) {
            for (var j = 0; j < hideIds.length; j++) {
                if (hideIds[j] == divElementIds[i]) {
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

    
    
    generateAbilityScores() {
        var abilityScores = _characterService.AbilityScores;
        for (var i = 0; i < abilityScores.count; i++){
            this.generateAbilityScore(abilityScores.results[i].name)
        }
    }
    
    generateAbilityScore(ability) {
        var num = randomDSix();
        document.getElementById(ability.toLowerCase()).innerHTML = num;
        this.setAbilityScore(ability, num)
    }

    setAbilityScore(ability, num) {
        _characterService.setAbilityScore(ability, num)
    }

    saveAbilityScores() {
        var abilityScoreCheck = _characterService.Character;
      //  var abilityScores = _characterService.AbilityScoresInfo

        if (abilityScoreCheck[2] == undefined) {
            console.log("SAVING SCORES")
            _characterService.saveAbilityScores()
        } else {
            console.log("REPLACING SCORES")
            _characterService.replaceAbilityScores()
        }        
        drawCharacterProgress()
    }

    


}
;