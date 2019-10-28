import CharacterController from "./components/character/character-controller.js";

class App {
  constructor() {
    this.controllers = {
        characterController: new CharacterController()
        }
    }
 }

window['app'] = new App()  