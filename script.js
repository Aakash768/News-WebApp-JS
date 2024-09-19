const api_key = "165d6b624f9f4598ad64b7f8037ba551";
const cards = document.getElementById("cards");
const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");



async function randomNews(){
    try
    {      
        const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api_key}`;

        const response = await fetch(url);

        const data = await response.json();

        return data.articles;


    }
    catch(error){
        console.log("Error encountered", error)

    }


}

function displaycards(articles){
    cards.innerHTML = "";

    articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt = article.title;

        const h3 = document.createElement("h3");
        h3.textContent = article.title;



        card.appendChild(image);
        card.appendChild(h3);

        card.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        cards.appendChild(card);


       
    }

    )

}



search_button.addEventListener("click", async() => {
    query = search_input.value.trim();
    if (query !== ""){
        try{
            const articles = await fetchQuery(query);
            displaycards(articles);
        }
        catch(error){
            window.alert("error", error);
        }
    }
})


async function fetchQuery(query){
    try{
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;

    }

    catch(e){
        console.log("alert",error);
    }
}


(async () => {

    try{
        const articles = await randomNews();
        displaycards(articles);

      

    }
    catch(e){
        console.log("error", e);
    }
})();