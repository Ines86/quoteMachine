let randomQuote;
document
  .getElementsByClassName("get-quote")[0]
  .addEventListener("click", loadQuote);
document
  .getElementsByClassName("share-quote")[0]
  .addEventListener("click", shareQuote);

//Get a new quote
function loadQuote() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://cors-everywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    true
  );

  xhr.onload = function () {
    if (this.status == 200) {
      randomQuote = JSON.parse(this.responseText);
      if (randomQuote.quoteAuthor) {
        document.getElementById("author").innerHTML =
          "--" + randomQuote.quoteAuthor;
      } else {
        document.getElementById("author").innerHTML = "--Unknown";
      }
      document.getElementById("quote").innerHTML = randomQuote.quoteText;
    }
  };

  xhr.send();
}

// Share a quote
function shareQuote(e) {
  e.preventDefault();
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(randomQuote.quoteText + " --" + randomQuote.quoteAuthor)
  );
}
