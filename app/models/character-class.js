export default class CharacterClass {
    constructor(data) {
      //  console.log('[Characer Class Data]', data);
     
        this.class_levels = data.class_levels;
        this.hit_die = data.hit_die;
        this.index = data.index;
        this.name = data.name;
        this.proficiencies = data.proficiencies;
        this.proficiency_choices = data.proficiency_choices;
        this.saving_throws = data.saving_throws;
        if (data.spellcasting == undefined) {
            this.spellcasting = []
        } else{
            this.spellcasting = data.spellcasting;
        }
        this.starting_equipment = data.starting_equipment;
        this.subclasses = data.subclasses;
    }
    get Template() {
        var template = `<div class="col-12">
                        <p class="close" onclick="app.controllers.characterController.hide('classInfo')">Close</p>
                        <p> Class: ${this.name} </p>
                        <p> Hit die: ${this.hit_die} </p>
                        <p> Gibberish trying to find out why the class choice div is not going across the whole screen. I suspect its from the content and needs to have more so that it will go across the screen.</p>
                        <div class="row text-center" onclick="app.controllers.characterController.chooseClass(${this.index})">
                            <div class="col-12" id="chooseClass"> 
                                <p>Choose ${this.name}</p>
                            </div>    
                        </div>
                     </div>`
        return template;
    }
}