const quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data)
    // If author text is blank, add 'unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quote
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerHTML = data.quoteText;

    //stop loader, show quote
     removeLoadingSpinner();
  } catch (error) {
    getQuote();
    // console.log(`Whoops, no quote ${error}`);
  }
}

//Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuote();
// quoteText.innerHTML = 'hello';