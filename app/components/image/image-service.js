/*import Image from "../../models/image.js";

// @ts-ignore
const imgApi = axios.create({
	baseURL: '//bcw-sandbox.herokuapp.com/api/images',
	timeout: 3000
});

let _state = {
    image: {}
}

let _subscribers = {
    image: []
}

function _setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

export default class ImageService {

    get Image() {
        return _state.image
    }  

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    getImage() {
        imgApi.get()
            .then(res => {
                console.log("This is the image GET response: ", res)
                _setState("image", new Image(res.data))
               
            })
            .catch(err => _setState('error', err.response.data))
    }
}
*/