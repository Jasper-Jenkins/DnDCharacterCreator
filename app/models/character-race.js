export default class CharacterRace {
    constructor(data) {
       // console.log('[Character Race Data]', data);

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

    get Template() {
        
        var chooseRaceButton = ''
        if (!this.chosen) {
            //chooseRaceButton = `<div class="col-12" id="chooseRace"> <p>Choose ${this.name}</p> </div>`
            chooseRaceButton = `<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="app.controllers.characterController.chooseRace(${this.index})">Choose ${this.name}</button>`
        } else {
       //     chooseRaceButton = ''
        }
               
        var template = `<div class="col-12">
                            <h1 class="text-center"> ${this.name}</h1>
                            <p>Ability Bonuses: STR +${this.ability_bonuses[0]}, DEX +${this.ability_bonuses[1]}, CON +${this.ability_bonuses[2]}, INT +${this.ability_bonuses[3]}, WIS +${this.ability_bonuses[4]}, CHA +${this.ability_bonuses[5]}</p>
                            <p>Size: ${this.size} </p>
                            <p>Alignment: ${this.alignment}</p>
                            `+chooseRaceButton+`
                        </div>`
        return template;
    }

}