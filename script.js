const quotecontainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loader 
function loading() {
    loader.hidden = false;
    quotecontainer.hidden = true;
}
//hind loading
function complete() {
    if (!loader.hidden) {
        quotecontainer.hidden = false;
        loader.hidden = true;
    }
}

let apiQuotes = [];


// get quote from API
async function getQuote() {
    loading();
    const apiURL = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json();
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        console.log(quote);

        // check author blank
        if (!quote.author) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
        // ckeck qoute length
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        //set quote,hind loder

        quoteText.textContent = quote.text;
        complete();


    } catch (err) {
        // Error
    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}
//Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


// main
getQuote();
// newQuote();