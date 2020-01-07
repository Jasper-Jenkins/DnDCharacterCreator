export default class CharacterRaces {

    constructor(data) {      
        this.count = data.count;
        this.results = data.results;
    }
    
    get RaceSelection() {
        var template = ""
        for (var i = 0; i < this.count; i++) {
            template += `<div class="col-4 selection text-center" id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.raceInfo('${this.results[i].name}')">
                            <p>${this.results[i].name}</p> 
                         </div>`
        }
        return template;
    }

} 