export default class CharacterClasses {
    constructor(data) {
    //    console.log('[Character Class Data]', data);
        this.count = data.count;
        this.results = data.results;
    }

    get ClassSelection() {
        var template = '';
        for (var i = 0; i < this.count; i++) {
            template += `<div class="col-4 selection text-center" onclick="app.controllers.characterController.classInfo('${this.results[i].name}')">
                            <p>${this.results[i].name}</p> 
                         </div>`;
        }
        return template;
    } 
    /*
    disableSelection(className) {
        var template = ""
        for (var i = 0; i < this.count; i++) {
          //  console.log("WTF", this.results[i])
            if (className == this.results[i].name) {
          //      console.log("DISABLED")
                template += `<button class="selection text-center" disabled id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.classInfo('${this.results[i].name}')">
                                ${this.results[i].name} 
                             </button>`
            } else {
        //        console.log("ENABLED")
                template += `<button class="selection text-center" id="${this.results[i].name.toLowerCase()}" onclick="app.controllers.characterController.classInfo('${this.results[i].name}')">
                                ${this.results[i].name} 
                            </button>`
            }

        }
        return template;
    }*/
}