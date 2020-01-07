export default class CharacterRace {
    constructor(data) {
     //   console.log('[Character Race Data]', data);

        this._id = data._id;
        this.ability_bonuses = data.ability_bonuses;
        this.age = data.age;
        this.alignment = data.alignment;
        this.index = data.index;
        this.language_desc = data.language_desc;
        this.languages = data.languages;
        this.name = data.name;
        this.size = data.size;
        this.size_description = data.size_description;
        this.starting_proficiencies = data.starting_proficiencies;
        this.subraces = data.subraces;
        this.traits = data.traits;
        this.url = data.url;
        this.chosen = false;
    }  

    switchRace(switchRace) { this.chosen = !switchRace }

    get RaceInfo() {
        
        var chooseRaceButton = ''
        var abilityBonuses = ''
        for (var i = 0; i < this.ability_bonuses.length; i++) {
            abilityBonuses += `${this.ability_bonuses[i].name} ${this.ability_bonuses[i].bonus}`
        }

        if (!this.chosen) {
            chooseRaceButton = `<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="app.controllers.characterController.chooseRace('${this.index}')">Choose ${this.name}</button>`
        }
               
        var template = `<div class="col-12">
                            <h1 class="text-center"> ${this.name}</h1>

                            <p>Ability Bonuses: ${abilityBonuses}</p>
                            <p>Size: ${this.size} </p>
                            <p>Alignment: ${this.alignment}</p>
                            `+chooseRaceButton+`
                        </div>`
        return template;
    }

}