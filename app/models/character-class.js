export default class CharacterClass {
    constructor(data) {
      //  console.log('[Characer Class Data]', data);
     
        this.class_levels = data.class_levels;
        this.hit_die = data.hit_die;
        this.index = data.index;
        this.name = data.name;
        this.proficiencies = data.proficiencies;
        this.proficiency_choices = data.proficiency_choices;
        this.saving_throws = data.saving_throws;
        this.spellcasting = data.spellcasting;
        this.starting_equipment = data.starting_equipment;
        this.subclasses = data.subclasses;
    }

}