import CharacterService from "./character-service.js"

const _characterService = new CharacterService()

function drawRaceSelection() {
    var races = _characterService.RaceSelection
    var template = ''
    template += races.RaceSelection
    document.getElementById('raceSelection').innerHTML = template
}

function drawRaceInfo(race) {
    var template = ''
    template += race.RaceInfo
    document.getElementById('raceInfo').innerHTML = template    
}

function drawClassProficiencies(characterClass) {
   // console.log("Figure it out", characterClass)
    var proficiencies = characterClass.proficiencies
    console.log("proficiencies", proficiencies)
    var template = characterClass.ProficiencyChoices
    document.getElementById('classProficienciesSelect').innerHTML = template
}

function drawClassSelection() {
    var classes = _characterService.ClassSelection
    var template = ''
    template += classes.ClassSelection
    document.getElementById('classSelection').innerHTML = template
}

function drawClassInfo(cClass) {
    var template = ''
    template += cClass.ClassInfo
    document.getElementById('classInfo').innerHTML = template
}

function drawAbilityScoresSelection() {
    var character = _characterService.Character
    var scores = _characterService.AbilityScoresSelection

    var template = ''
    var templateTwo = ''

    if (character.abilityScores) {
        console.log("WEEEE")
        for (var i = 0; i < character.abilityScores.length; i++) {
            console.log("GHOST", character.abilityScores[i])

            document.getElementById(character.abilityScores[i].name.toLowerCase()).innerHTML = character.abilityScores[i].points
           /* template +=
                `<div class="col-3 abilityScore text-center">
                    <p>${character.abilityScores[i].name}: <span id="${character.abilityScores[i].name.toLowerCase()}">0</span><p>
                 </div>`*/
        }
       /* document.getElementById('abilityScoreInfo').innerHTML = template */
    } else {
        template += scores.Template
        document.getElementById('abilityScoreInfo').innerHTML = template
    }

    
    templateTwo += scores.ScoreSelectorTemplate
    templateTwo += `<div class="col-12 text-center" onclick="app.controllers.characterController.generateAbilityScores()">
                        <p>Generate All scores</p>
                    </div>
                    <div class="col-12 text-center" onclick="app.controllers.characterController.saveAbilityScores()">
                        <p>Save scores</p>
                    </div>   
                   `    
    document.getElementById('abilityScoreSelection').innerHTML = templateTwo
}


function drawCharacterProgress() {

    var character = _characterService.Character
    var template = ''

    var characterCategories = [
        { name: "race", buttonName: "Race" },
        { name: "class", buttonName: "Class" },
        { name: "abilityScores", buttonName: "Ability Scores" },
        { name: "proficiencies", buttonName: "Proficiencies" }
    ]
    
    for (var i = 0; i < characterCategories.length; i++) {
        template += `<div id="${characterCategories[i].name}Progress" class="col-2 characterProgress" onclick="app.controllers.characterController.${characterCategories[i].name}Progress()">${characterCategories[i].buttonName}</div> `
    }

    document.getElementById('characterProgress').innerHTML = template

    if (character.race) {
        template = `${character.race.name}`
        document.getElementById('raceProgress').innerHTML = template
    }
    if (character.class) {
        template = `${character.class.name}`
        document.getElementById('classProgress').innerHTML = template
    }
    if (character.abilityScores) {
        template = `Ability Scores`
        document.getElementById('abilityScoresProgress').innerHTML = template
    }
}

function randomDSix() {
    var totalDiceRolls = 5;
    var totalRollsToKeep = 3;

    var abilityPoint = 0
    var abilityPoints = 0
    var abilityPointsArray = []
    
    for (var i = 0; i < totalDiceRolls; i++) {
        abilityPoint = Math.floor((Math.random() * 6) + 1)
        abilityPointsArray.push(abilityPoint)
    }
    abilityPointsArray.sort()
    abilityPointsArray.splice(0, totalDiceRolls - totalRollsToKeep)

    for (var j = 0; j < abilityPointsArray.length; j++) {
        abilityPoints += abilityPointsArray[j]
    }

    return abilityPoints
} 

export default class CharacterController {

    constructor() {
      _characterService.addSubscriber('raceSelection', drawRaceSelection)
      _characterService.addSubscriber('classSelection', drawClassSelection)
      _characterService.addSubscriber('abilityScoresSelection', drawAbilityScoresSelection)
      drawCharacterProgress()
      this.creationElements = ["alert", "raceCreation", "classCreation", "abilityScoresCreation", "proficienciesCreation"]
    }

    raceInfo(raceName) {
        var race = _characterService.Races
        for (var i = 0; i < race.length; i++) {
            if (race[i].name == raceName) {
                drawRaceInfo(race[i])
                break
            }
        }
    }

    classInfo(className) {
        var cClass = _characterService.Classes
        for (var i = 0; i < cClass.length; i++) {
            if (cClass[i].name == className) {
                drawClassInfo(cClass[i])
                break
            }
        }        
    }    

    chooseRace(raceIndex) {
        _characterService.chooseRace(raceIndex)
        this.swapScreens("classCreation")
        drawCharacterProgress()
    }

    raceProgress() {
        var character = _characterService.Character
        if (character.race) {
            drawRaceInfo(character.race)
        }
        this.swapScreens('raceCreation')
    }
   
        
    chooseClass(classIndex) {
        var character = _characterService.Character
        _characterService.chooseClass(classIndex)
        this.swapScreens("abilityScoresCreation")
        drawCharacterProgress()
        drawClassProficiencies(character.class)
    }

    classProgress() {
        var character = _characterService.Character
        if (character.class) {
            drawClassInfo(character.class)
        }
        this.swapScreens('classCreation')
    }

    abilityScoresProgress() {
        drawAbilityScoresSelection()
        this.swapScreens('abilityScoresCreation')
    }

    proficienciesProgress() {
        this.swapScreens('proficienciesCreation')    
    }
    
    showAlert(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 2
        document.getElementById(elementToShow).style.visibility = "visible"
    }

    show(elementToShow) {
        if (document.getElementById(elementToShow).classList.contains("hide")){
            document.getElementById(elementToShow).classList.remove("hide")
        }
        document.getElementById(elementToShow).classList.add("show")
    }

    hide(elementToHide) {
        if (document.getElementById(elementToHide).classList.contains("show")) {
            document.getElementById(elementToHide).classList.remove("show")
        }
        document.getElementById(elementToHide).classList.add("hide")
    }

    swapScreens(showId) {
        var elements = this.creationElements
        for (var j = 0; j < elements.length; j++) {
            if (showId == elements[j]) {
                this.show(elements[j])
            } else {
                this.hide(elements[j])
            }
        }
    }

    generateAbilityScore(ability) {
        console.log("Made it", ability)
        var num = randomDSix()
        document.getElementById(ability.toLowerCase()).innerHTML = num
        this.setAbilityScore(ability, num)
    }
    
    generateAbilityScores() {
        var abilityScores = _characterService.AbilityScoresSelection
        for (var i = 0; i < abilityScores.count; i++){
            this.generateAbilityScore(abilityScores.results[i].name)
        }
    }  

    setAbilityScore(ability, num) {
        _characterService.setAbilityScore(ability, num)
    }

    saveAbilityScores() {
        _characterService.saveAbilityScores()
        drawCharacterProgress()
    }
}
