export default class CharacterRaces {
    constructor(data) {
       // console.log('[ALL Races Data]', data);
      
        this.count = data.count;
        this.results = data.results;
    }

    get Template() {
        var template = ""
        for (var i = 0; i < this.count; i++) {
            template += `<div class="col characterRace text-center" onclick="app.controllers.characterController.raceInfo('${this.results[i].name}')">
                        <p>${this.results[i].name}</p> 
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                        </div>
                    </div>`
        }
        return template;
    }
}