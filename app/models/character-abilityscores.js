export default class CharacterAbilityScores {
    constructor(data) {
        this.count = data.count;
        this.results = data.results;
    }

    get Template () {
        var template = ''
       // template += '<div class="col-12">'
        for (var i = 0; i < this.count; i++) {
            template +=
                `<div class="col-3 abilityScore text-center">
                    <p>${this.results[i].name}: <span id="${this.results[i].name.toLowerCase()}">0</span><p>
                     <div class="row" onclick="app.controllers.characterController.generateAbilityScore('${this.results[i].name}')">
                        <p>Generate</p>
                     </div>
                </div>`
                
        }
        template += `<div class="col-12 text-center" onclick="app.controllers.characterController.generateAbilityScores()">
                         <p>Generate All scores</p>
                     </div>
                     <div class="col-12 text-center" onclick="app.controllers.characterController.saveAbilityScores()">
                         <p>Save scores</p>
                     </div>   
                     `
        return template;
    }
} 