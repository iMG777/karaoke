const YT_API_KEY = "#"; //SUBSTITUA POR SUA KEY

async function searchMusic(){
    const searchedMusic = document.getElementById('inputSearch').value;

    if(!searchedMusic.trim()){
        alert("Por Favor, Insira o Nome Da Música Ou Do Artista!");
        return;
    }

    const tagSearch = `${searchedMusic} Karaoke`;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(tagSearch)}&type=video&maxResults=3&key=${YT_API_KEY}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            console.error('Erro Da API Do YouTube', data.error.message);
            alert(`Erro Na Busca: ${data.error.message}`);
            return;
        }

        showResults(data.items);

    }   catch(erro){
        console.error("Não Encontramos A Música", erro);
    }
}

function showResults(listVideos){
    const container = document.getElementById('results');

    container.innerHTML = '';

    listVideos.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.medium.url;

        const card = document.createElement('div');
        card.classList.add('cardVideo');

        const embedUrl = `https://www.youtube.com/embed/${videoId}`

        card.innerHTML = `
            <img src="${thumb}" alt="${title}">
            <h3>${title}</h3>
        `;

        const btnRender = document.createElement('button');
        btnRender.textContent = 'Reproduzir';
        btnRender.onclick = () => renderVideo(embedUrl);

        card.appendChild(btnRender)
        container.appendChild(card);
    });
}

function renderVideo(url){
    const player = document.getElementById('player');

    player.innerHTML = `
        <iframe
            width="960"
            height="715"
            src="${url}"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;
}
