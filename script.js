const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let input = document.getElementById("input").value.trim();
    result.innerHTML = '';
    if (input === '') {
        result.innerHTML = '<p style="color:red;">Please enter a word!</p>';
        return;
    }
    result.innerHTML = '<p>Loading...</p>';

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)

        .then((response) => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then((data) => {
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
            result.innerHTML = '<p style="color:red;">Word not found. Please try again.</p>';
        });
});

