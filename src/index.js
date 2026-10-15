

const ID = "2993";
const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

// Obtener datos de la serie
const getShowData = async (id) => {
    const URL = `https://api.tvmaze.com/shows/${id}`;
    const data = await fetch(URL).then(res => res.json());

    return {
        name: data.name,
        rating: data.rating,
        image: data.image?.medium ?? PLACEHOLDER_IMAGE
    };
};

// Obtener episodios de la serie
const getEpisodeList = async (id) => {
    const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
    const data = await fetch(URL).then(res => res.json());

    const seasons = {};

    data.forEach(episode => {

        const season = episode.season;

        if (!seasons[season]) {
            seasons[season] = [];
        }

        seasons[season].push({
            number: episode.number,
            season: episode.season,
            rating: episode.rating?.average
        });

    });

    return seasons;
};

// Elementos del DOM
const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

// Crear HTML de cada episodio
const createEpisodeHTML = (episode) => {

    const rating = episode.rating == null
        ? 0
        : Math.max(0, Math.min(10, Math.round(episode.rating)));

    return `
        <div class="episode episode-${episode.number} rating-${rating}">
            ${episode.number ?? "-"}
        </div>
    `;
};

// Crear HTML de cada temporada
const createSeasonHTML = (data, number) => {

    return `
        <article class="season">

            <header class="season-header">
                T${number}
            </header>

            ${data.map(episode => createEpisodeHTML(episode)).join("")}

        </article>
    `;
};

// Obtener información y mostrarla
const main = async () => {

    try {

        const show = await getShowData(ID);
        const seasons = await getEpisodeList(ID);

        // Información principal de la serie
        $header.innerHTML = `
            <img class="poster" src="${show.image}" alt="Poster">

            <div>
                <h1>${show.name}</h1>
                <p>Rating: ${show.rating?.average ?? "Sin valoración"}</p>
            </div>
        `;

        // Recorrer cada temporada
        const list = Object.values(seasons).map(
            (season, index) => createSeasonHTML(season, index + 1)
        );

        // Mostrar episodios
        $episodes.innerHTML = list.join("");

    } catch (error) {
        console.error("Error al cargar la serie:", error);
        $header.textContent = "No se pudo cargar la serie.";
    }

};

main();
