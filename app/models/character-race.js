export default class CharacterRace {
    constructor(data) {
        console.log('[Character Race Data]', data);
        /*
        this.name = name;
        this.race = race;
        this.profession = profession; //also class (hunter, wizard, ..., ), but language doesnt like "class" alone 
        */

        this.id = data._id;
        this.race = data.race;
        this.ability_bonuses = data.ability_bonuses;
        this.age = data.age;
        this.alignment = data.alignment;
        this.index = data.index;
        this.language_desc = data.language_desc;
        this.languages = data.languages;
        this.name = data.name;
        this.size = data.size;
        this.size_description = data.size_description;
        this.starting_proficiences = data.starting_proficiences;
        this.subraces = data.subraces;
        this.traits = data.trais;
        this.url = data.url;

    }
}