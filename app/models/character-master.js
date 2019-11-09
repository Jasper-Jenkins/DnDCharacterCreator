export default class CharacterPlayer {
    constructor(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] instanceof CharacterRace) {
                this.race = data[i]
            }else if (data[i] instanceof CharacterClass) {
                this.class = data[i]
            }
        } 
    }

}