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

    get ClassInfo() {
        var proficiencies = ''
        var chooseClassButton = ''

        for (var i = 0; i < this.proficiencies.length; i++) {
            proficiencies += `<span> ${this.proficiencies[i].name}</span>`
        }

        if (!this.chosen) {
            chooseClassButton = `<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="app.controllers.characterController.chooseClass(${this.index})">Choose ${this.name}</button>`
        } else {
            chooseClassButton = ''
        }

        var template = `<div class="col-12">
                            <h1 class="text-center"> ${this.name}</h1>
                            <p> Hit die: ${this.hit_die} </p>
                            <p> Starting Proficiencies: ${proficiencies}</p>
                              `+ chooseClassButton + `   
                        </div>`
        return template
    }

    switchClass(switchClass) { this.chosen = !switchClass }

    get ProficiencyChoices() {
        var choices = this.proficiency_choices
        console.log("CHOICES CHOICES CHOICES", choices)
        var template = ''
        for (var i = 0; i < choices.length; i++) {
            template += `<div class="col-6">`
            for (var j = 0; j < choices[i].from.length; j++) {
                if (j == 0) {template += `<h3>Choose ${choices[i].choose}</h3>`}
                template += `<button type="button" class="btn btn-primary btn-sm" onclick="app.controllers.characterController.addProficiency('${choices[i].from[j].name}')">${choices[i].from[j].name}</button>`
            }
            template += `</div>`
        }  
        return template
    }


    addProficiency(proficiency) {
        //this.proficiencies
    }

    removeProficiency() {}
}