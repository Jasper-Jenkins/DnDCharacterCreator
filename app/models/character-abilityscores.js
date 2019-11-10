export default class CharacterAbilityScores {
    constructor(data) {
        this.count = data.count;
        this.results = data.results;
    }

    get Template () {
        var template = ''
        for (var i = 0; i < this.count; i++) {
            template +=
                `<div class="col-3 abilityScore text-center">
                    <p>${this.results[i].name}: <span id="${this.results[i].name.toLowerCase()}">0</span><p>
                 </div>`
        }
        
        return template;
    }

    get ScoreSelectorTemplate() {
        var template = ''
        for (var i = 0; i < this.count; i++) {
            template +=
                `<div class="col-2 abilityScore text-center" onclick="app.controllers.characterController.generateAbilityScore('${this.results[i].name}')">
                    <p>${this.results[i].name}<p>
                 </div>`
        }

        return template;
    }


} 