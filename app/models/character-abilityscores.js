export default class CharacterAbilityScores {
    constructor(data) {
        this.count = data.count;
        this.results = data.results;
    }

    get Template () {
        var template = ""
        template += `<div class="col-12">`
        for (var i = 0; i < this.count; i++) {
            template +=                
                `<div class="row" id="${this.results[i].name}">${this.results[i].name}</div>`
        }
        template +=`</div>`
        return template;
    }
}