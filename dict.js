const result = document.getElementById("result");
const btn = document.getElementById("search-btn");


btn.addEventListener("click", () => {
   let input = document.getElementById("input").value;
   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
       .then((response) => response.json())
       .then((data) => {
           console.log(data);


           const word = data[0].word;
           const partOfSpeech = data[0].meanings[0].partOfSpeech;
           const definition = data[0].meanings[0].definitions[0].definition;
           const example = data[0].meanings[0].definitions[0].example || "No example available";


           result.innerHTML = `
               <div class="result">
                   <p>Word: - ${word}</p>
                   <p>Part of Speech: - ${partOfSpeech}</p>
                   <p>Definition: - ${definition}</p>
                   <p>Example: ${example}</p>
               </div>`;
       })
       .catch((error) => {
           console.error('Error fetching data:', error);
           result.innerHTML = '<p>Word not found. Please try again.</p>';
       });
});


