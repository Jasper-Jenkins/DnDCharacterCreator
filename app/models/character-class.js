export default class CharacterClass {
    constructor(data) {
       //console.log('[Characer Class Data]', data);
     
        this.class_levels = data.class_levels;
        this.hit_die = data.hit_die;
        this.index = data.index;
        this.name = data.name;
        this.proficiencies = data.proficiencies;
        this.proficiency_choices = data.proficiency_choices;
        this.saving_throws = data.saving_throws;
        if (data.spellcasting == undefined) {
            this.spellcasting = {};
        } else{
            this.spellcasting = data.spellcasting;
        }
        this.starting_equipment = data.starting_equipment;
        this.subclasses = data.subclasses;
        this.chosen = false;
    }

    get Template() {
        var proficiencies = ''
        var chooseClassButton = ''

        for (var i = 0; i < this.proficiencies.length; i++) {
            proficiencies += `<span> ${this.proficiencies[i].name}</span>`
        }

        if (!this.chosen) {
            chooseClassButton = `<div class="col-12" id="chooseClass"><p>Choose ${this.name}</p></div>`
        } else {
            chooseClassButton = ''
        }

        var template = `<div class="col-12">
                            <h1 class="text-center"> ${this.name}</h1>
                            <p> Hit die: ${this.hit_die} </p>
                            <p> Starting Proficiencies: ${proficiencies}</p>
                            <div class="row text-center" onclick="app.controllers.characterController.chooseClass(${this.index})">
                                `+ chooseClassButton + `    
                            </div>
                        </div>`
        return template
    }

    switchClass(switchClass) { this.chosen = !switchClass }

}