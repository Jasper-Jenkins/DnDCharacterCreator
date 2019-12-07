import CharacterService from "./character-service.js"

const _characterService = new CharacterService()

/**
 * Race Control
 **/
function drawRaceSelection() {
    var races = _characterService.RaceSelection
    var template = ''
    template += races.RaceSelection
    document.getElementById('raceSelection').innerHTML = template
}

function drawRaceInfo(raceName) {
    var race = _characterService.Races
    var template = ''
    for (var i = 0; i < race.length; i++) {
        if (race[i].name == raceName) {
            template += race[i].RaceInfo
            document.getElementById('raceInfo').innerHTML = template
            break
        }
    }
}


function drawClassProficiencies(characterClass) {
    var proficiencies = characterClass.ProficiencyChoices
    console.log("TRYING TO DRAW CLASS PROFICIENCIES: ")
    document.getElementById('classProficienciesSelect').innerHTML = proficiencies
}

function drawClassSelection() {
    var classes = _characterService.ClassSelection
    var template = ''
    template += classes.ClassSelection
    document.getElementById('classSelection').innerHTML = template
}

function drawClassInfo(className) {
    var cClass = _characterService.Classes
    var template = ''
    for (var i = 0; i < cClass.length; i++) {
        if (cClass[i].name == className) {
         //   console.log("eureka")
            template += cClass[i].ClassInfo
            document.getElementById('classInfo').innerHTML = template
            break
        }
    }
}

function drawAbilityScoresSelection() {
    var scores = _characterService.AbilityScores
    var template = ''
    var templateTwo = ''

    template += scores.Template
    document.getElementById('abilityScoreInfo').innerHTML = template

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
    var abilityPoints = 0
    for (var i = 0; i < 3; i++) {
        abilityPoints += Math.floor((Math.random() * 6) + 1)       
    }
    return abilityPoints
} 

export default class CharacterController {

    constructor() {
       // _characterService.addSubscriber('raceSelection', drawRaceSelection)
        _characterService.addSubscriber('classSelection', drawClassSelection)
       // _characterService.addSubscriber('abilityScoresData', drawAbilityScoresSelection)
       // _characterService.getAllAbilityScores()
  
        drawCharacterProgress()

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
        console.log("Name Chosen by the player: ", characterName)}
    */

    raceInfo(raceName) {
        drawRaceInfo(raceName)
        this.showInfo('raceInfo')
    }

    classInfo(className) {
        drawClassInfo(className)
        this.showInfo('classInfo')
    }    

    chooseRace(raceIndex) {
        var character = _characterService.Character

        if (character.race != undefined) {
            _characterService.flipChosenRace(character.race.index)
        }
        _characterService.chooseRace(raceIndex)
        _characterService.flipChosenRace(raceIndex)

        //Why should I use functions private to the controller as apposed to those outside the controller
        this.swapScreens("classCreation", ["raceCreation", "alert"])
        drawCharacterProgress()
        drawRaceInfo(character.race.name)
    }

    raceProgress() {
        var character = _characterService.Character
        if (character.race) {
            drawRaceInfo(character.race.name)
        }
        this.swapScreens('raceCreation', ['alert', 'classCreation', 'abilityScoresCreation', 'proficienciesCreation'])
    }
   
        
    chooseClass(classIndex) {
        var character = _characterService.Character

        if (character.class != undefined) {
            _characterService.flipChosenClass(character.class.index)
        }

        _characterService.chooseClass(classIndex)
     
        this.swapScreens("abilityScoresCreation", ["classCreation", "alert"])
        drawCharacterProgress()
        drawClassInfo(character.class.name)
        drawClassProficiencies(character.class)
    }

    classProgress() {
        var character = _characterService.Character
        if (character.class) {
            drawClassInfo(character.class.name)
        }
        this.swapScreens('classCreation', ['alert', 'raceCreation', 'abilityScoresCreation', 'proficienciesCreation'])
    }

    abilityScoresProgress() {
        var character = _characterService.Character
        if (character.abilityScores) {
            drawAbilityScoresSelection()
        }
        this.swapScreens('abilityScoresCreation', ['alert', 'raceCreation', 'classCreation', 'proficienciesCreation'])
    }

    proficienciesProgress() {
        this.swapScreens('proficienciesCreation', ['alert','raceCreation','classCreation','abilityScoresCreation'])    
    }
    
    showInfo(elementToShow) {
        document.getElementById(elementToShow).style.zIndex = 2
        document.getElementById(elementToShow).style.visibility = "visible"
    }

    show(elementToShow) {
     //   console.log("Showing HTML div element: ", elementToShow)
        document.getElementById(elementToShow).style.zIndex = 1
        document.getElementById(elementToShow).style.visibility = "visible"
    }

    hide(elementToHide) {
    //    console.log("Closing HTML div element: ", elementToHide)
        document.getElementById(elementToHide).style.zIndex = 0
        document.getElementById(elementToHide).style.visibility = "hidden"
    }

    swapScreens(showId, hideIds) {
        var divElementIds = ["alert","classCreation", "raceCreation", "abilityScoresCreation", "proficienciesCreation"]
        var check = 0
        for (var i = 0; i < divElementIds.length; i++) {
            for (var j = 0; j < hideIds.length; j++) {
                if (hideIds[j] == divElementIds[i]) {
                    this.hide(hideIds[j])
                    check++
                }
                if (check == hideIds.length) {
                    break
                }
            }
            if (check == hideIds.length) {
                break
            }
        }
        if (showId == "alert") {
            this.showInfo(showId)
        } else {
            this.show(showId)
        }
    }

    generateAbilityScore(ability) {
        var num = randomDSix()
        document.getElementById(ability.toLowerCase()).innerHTML = num
        this.setAbilityScore(ability, num)
    }
    
    generateAbilityScores() {
        var abilityScores = _characterService.AbilityScoresData
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
