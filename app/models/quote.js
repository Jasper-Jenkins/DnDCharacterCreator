export default class Quote {
    constructor(data) {
        console.log("Quote data: ", data)
        this.author = data.quote.author;
        this.body = data.quote.body;
    }
}