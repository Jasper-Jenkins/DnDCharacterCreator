import PlayerController from "./components/character/character-controller.js";

class App {
  constructor() {
    this.controllers = {
        playerController: new PlayerController()
        }
    }
 }

window['app'] = new App()  