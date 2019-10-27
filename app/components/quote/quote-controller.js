/*import QuoteService from "./quote-service.js";

let _qs = new QuoteService()

function _drawQuote() {
    let quote = _qs.Quote
    var template = ""
    template = `<p>${quote.body}</p>
					<span id="quoteAuthor"> - ${quote.author} - </span>
					`
    document.getElementById('quote').innerHTML = template;
    console.log('What is the quote', quote)
}

export default class QuoteController {
    constructor() {
        _qs.addSubscriber("quote", _drawQuote)
        _qs.getQuote()
    }

}
*/