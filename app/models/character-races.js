export default class CharacterRaces {
    constructor(data) {
       // console.log('[ALL Races Data]', data);
      
        this.count = data.count;
        this.results = data.results;
        this.selectionSwitch = true;
    }
    
    get Template() {
        var template = ""
        for (var i = 0; i < this.count; i++) {
            template += `<div class="col-2 selection text-center" id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.raceInfo('${this.results[i].name}')">
                            <p>${this.results[i].name}</p> 
                         </div>`
        }
        return template;
    }


    disableSelection(raceName) {
        var template = ""


         

        for (var i = 0; i < this.count; i++) {
          //  console.log("WTF", this.results[i])
            if (raceName == this.results[i].name) {
             //   console.log("DISABLED")
                template += `<button class="selection text-center" id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.raceInfo('${this.results[i].name}')">
                                ${this.results[i].name} 
                             </button>`
            } else {
              //  console.log("ENABLED")
                template += `<button class="selection text-center" id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.raceInfo('${this.results[i].name}')">
                                ${this.results[i].name} 
                            </button>`
            }
            
        }
        return template;
    }
} 