export default class CharacterClass {
    constructor(data) {
        console.log('[Characer Class Data]', data);
        /*
        this.name = name;
        this.race = race;
        this.profession = profession; //also class (hunter, wizard, ..., ), but language doesnt like "class" alone 
        */
        this.class = data;
    }
}