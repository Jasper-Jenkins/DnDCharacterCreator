export default class Image {
    constructor(data) {
        console.log("Image data: ", data)
        this.large_url = data.large_url;
    }
}