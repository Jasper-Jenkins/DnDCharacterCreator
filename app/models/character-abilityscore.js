export default class CharacterAbilityScore {
    constructor(data) {

        console.log('[Character Ability Score Data]', data);
        this.desc = data.desc;
        this.full_name = data.full_name;
        this.index = data.index;
        this.name = data.name;
        this.skills = data.skills;
        this.url = data.url;
        this._id = data._id;
        this.points = 0;
    }

    setPoints(points) {
        console.log("ability set", this.name);
        this.points = points;
    }
} 