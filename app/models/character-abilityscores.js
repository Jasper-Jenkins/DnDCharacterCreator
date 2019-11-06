export default class CharacterAbilityScores {
    constructor(data) {
        this.count = data.count;
        this.results = data.results;
    }

    get Template () {
        var template = ''
        template += '<div class="col-12">'
     //   console.log("ABILITY SCORES: ", this.results)
        for (var i = 0; i < this.count; i++) {
            template +=
                `<div class="row">
                    <p>${this.results[i].name}:<span id="${this.results[i].name.toLowerCase()}"> 0</span><p>
                 </div>
                 <div class="row" onclick="app.controllers.characterController.generateAbilityScore('${this.results[i].name.toLowerCase()}')">
                    <p>Generate</p>
                 </div>`
        }
        template += `<div class="row" onclick="app.controllers.characterController.generateAbilityScores()">
                         <p>Generate All scores</p>
                     </div>
                     </div>`
        return template;
    }
} 