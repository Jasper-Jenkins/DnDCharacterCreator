export default class CharacterClasses {
    constructor(data) {
        console.log('[Characer Class Data]', data);
        this.count = data.count;
        this.results = data.results;
    }

    get Template() {
        var template = '';
        for (var i = 0; i < this.count; i++) {
            template += `<div class="col characterClass text-center" onclick="app.controllers.characterController.classInfo('${this.results[i].name}')">
                            <p>${this.results[i].name}</p> 
                         </div>`;
        }
        return template;
    }    
}