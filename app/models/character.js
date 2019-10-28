export default class Character {
    constructor(data) {
        console.log('[Characer Data]', data);
        /*
        this.name = name;
        this.race = race;
        this.profession = profession; //also class (hunter, wizard, ..., ), but language doesnt like "class" alone 
        */
        this.characters = data;
    }
}