export default class CharacterProficiency {
    constructor(data) {
      //  console.log("[Proficiency Data]", data)
        this.classes = data.classes
        this.index = data.index
        this.name = data.name
        this.races = data.races
        this.type = data.type
        this.url = data.url
        this._id = data._id
    }
}