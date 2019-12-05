import CharacterClasses from "../../models/character-classes.js"
import CharacterClass from "../../models/character-class.js"

// @ts-ignore
const classApi = axios.create({
    baseURL: "http://www.dnd5eapi.co/api",
    timeout: 3000
})

let _classesState = {
    classSelection: {},
    classes: []
}

let _classSubscribers = {
    classSelection: [],
    classes: []
}

function _setClassesState(prop, data) {
    if (prop == 'classes') {
        _classesState[prop].push(data)
    } else {
        _classesState[prop] = data
    }
    _classSubscribers[prop].forEach(fn => fn());
}

export default class ClassesService {

    get ClassSelection() { return _classesState.classSelection }

    get Classes() { return _classesState.classes }

    addClassSubscriber(prop, fn) {
        _classSubscribers[prop].push(fn)
    }

    fillClasses() {
        var classes = _classesState.classSelection
        for (var i = 0; i < classes.count; i++) {
            this.getSpecificClass(classes.results[i].url)
        }
    }

    allClasses() {
        console.log('Requesting the classes of Faerun from the DnD API')
        classApi.get("/classes/")
            .then(res => {
                _setClassesState('classSelection', new CharacterClasses(res.data))
                this.fillClasses()
            })
            .catch(err => {
                console.log("Error requesting ALL class: ", err)
                //_setState('error', err.response.data)
            })
    }

    getSpecificClass(url) {
        console.log('Requesting specific class information.')
        classApi.get(url)
            .then(res => {
                _setClassesState('classes', new CharacterClass(res.data))
            })
            .catch(err => {
                console.log("Error requesting a SINGLE class: ", err)
                //_setState('error', err.response.data)
            })
    }
}