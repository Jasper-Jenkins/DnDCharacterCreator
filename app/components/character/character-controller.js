import CharacterService from "./character-service.js";

const _characterService = new CharacterService();

function drawRaceSelection() {
    var races = _characterService.Races;
    var template = '';
    template += races.Template;
    document.getElementById('raceSelection').innerHTML = template;
}

function drawClassSelection() {
    var classes = _characterService.Classes;
    var template = '';
    template += classes.Template;
    document.getElementById('classSelection').innerHTML = template;
}

function drawAbilityScoresSelection() {
    var scores = _characterService.AbilityScores;
    var template = '';
    template += scores.Template;
    document.getElementById('abilityScoreSelection').innerHTML = template;
}

function drawRaceInfo(raceName) {
    var race = _characterService.RacesInfo;
    var template = '';
    for (var i = 0; i < race.length; i++) {
        if (race[i].name == raceName) {
              template += `<div class="col-12">
                            <p class="close" onclick="app.controllers.characterController.hide('raceInfo')">Close</p>
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

function drawClassInfo(className) {
    var cClass = _characterService.ClassesInfo;
    var template = '';
    for (var i = 0; i < cClass.length; i++) {
        if (cClass[i].name == className) {
            console.log("eureka");
            template += `<div class="col-12">
                            <p class="close" onclick="app.controllers.characterController.hide('classInfo')">Close</p>
                            <p> Class: ${cClass[i].name} </p>
                            <p> Hit die: ${cClass[i].hit_die} </p>
                            <p> Gibberish trying to find out why the class choice div is not going across the whole screen. I suspect its from the content and needs to have more so that it will go across the screen.
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
    var template = '';
    for (var i = 0; i < character.length; i++) {
        template += `<div class="col-2 characterProgress" onclick="app.controllers.characterController.swapScreen(${i})">${character[i].details.name}</div> `
    } 
     document.getElementById('characterProgress').innerHTML = template;
}

function drawChooseAnotherRace(newRace) {
    var template = '';
    var character = _characterService.Character;
    if (character[0].details.name == newRace.name) {
        template += `<div class="col-12"><p>You already have ${character[0].details.name} chosen as a race.</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Choose another</p></div>
                     </div>`   
    } else {
        template += `<div class="col-12"><p>You already have chosen ${character[0].details.name} as a race. Would you rather be ${newRace.name}</p> 
                     <div class="row justify-content-center text-center">
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.chooseAnotherRace(${newRace.index})"><p>Change to ${newRace.name}</p></div>
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Continue as ${character[0].details.name}</p></div>
                     </div>`;
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
                           <div class="col-6 chooseNewRace" onclick="app.controllers.characterController.hide('alert')"><p>Continue as ${character[1].details.name}</p></div>
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
            this.hide("raceInfo");
            this.hide("raceSelection");
            this.show("classSelection");
        } else {
            for (var i = 0; i < newRace.length; i++) {
                if (newRace[i].index == raceIndex) {
                    drawChooseAnotherRace(newRace[i]);
                    this.showInfo('alert');
                    this.hide("raceInfo");
                }
            }
        }
        drawCharacterProgress();
    }
           
    chooseAnotherRace(raceIndex) {
        _characterService.replaceRace(raceIndex);
        drawCharacterProgress();
        this.hide('alert');
        this.hide('raceSelection');
        this.show('classSelection');
    }
        
    chooseClass(classIndex) {
        var classCheck = _characterService.Character;
        var newClass = _characterService.ClassesInfo;
        if (classCheck[1] == undefined) {
            _characterService.chosenClass(classIndex);
            this.hide("classInfo");
            this.hide("classSelection");
            this.show("abilityScoreSelection");
        } else {
            for (var i = 0; i < newClass.length; i++) {
                if (newClass[i].index == classIndex) {
                    drawChooseAnotherClass(newClass[i]);
                    this.showInfo('alert')
                    this.hide('classInfo')
                }
            }
        }
        drawCharacterProgress();
    }

    chooseAnotherClass(classIndex) {
        _characterService.replaceClass(classIndex);
        drawCharacterProgress();
        this.hide('alert');
    }

    hide(elementToHide) {
        document.getElementById(elementToHide).style.zIndex = 0;
        document.getElementById(elementToHide).style.visibility = "hidden";
    }

    showInfo(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 2;
        document.getElementById(elementToShow).style.visibility = "visible";
    }

    show(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 1;
        document.getElementById(elementToShow).style.visibility = "visible";
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
        var abilities = ["STR","DEX","CON","INT","WIS","CHA"];
        var abilityScores = _characterService.AbilityScores;
        for (var i = 0; i < abilityScores.count; i++){
            if (abilityScores.results[i].name == abilities[i]) {
                this.generateAbilityScore(abilityScores.results[i].name.toLowerCase())
            }  
        }
    }
    
    generateAbilityScore(ability) {
        var num = randomNumber();
        document.getElementById(ability).innerHTML = num;
        //this.setAbilityScore( num)
    }

    setAbilityScore(ability, num) {
        _characterService.setAbilityScore(ability, num)
    }


}
;