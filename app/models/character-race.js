export default class CharacterRaces {
    constructor(data) {
        console.log('[Characer Races Data]', data);
        /*
        this.name = name;
        this.race = race;
        this.profession = profession; //also class (hunter, wizard, ..., ), but language doesnt like "class" alone 
        */
        this.race = data;
    }
}