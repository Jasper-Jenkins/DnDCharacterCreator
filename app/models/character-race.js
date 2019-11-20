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
    }  

    get Template() {
        var template = `<div class="col-12">
                            <p>Race: ${this.name}</p>
                            <p>Ability Bonuses: STR +${this.ability_bonuses[0]}, DEX +${this.ability_bonuses[1]}, CON +${this.ability_bonuses[2]}, INT +${this.ability_bonuses[3]}, WIS +${this.ability_bonuses[4]}, CHA +${this.ability_bonuses[5]}</p>
                            <p>Size: ${this.size} </p>
                            <p>Alignment: ${this.alignment}</p>
                            <div class="row text-center" onclick="app.controllers.characterController.chooseRace(${this.index})">
                                <div class="col-12" id="chooseRace"> 
                                    <p>Choose ${this.name}</p>
                                </div>    
                            </div>
                         </div>`
        return template;
    }

}