const API_KEY = 'd849c76792c0dabefbd599ce3788a75d';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page: number = 1) {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Fel vid hämtning av filmer', error);
        return [];
    }
}

export function getImageUrl(posterPath: string) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
}