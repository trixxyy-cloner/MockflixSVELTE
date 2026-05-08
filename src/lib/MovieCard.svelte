<script lang="ts">
    export let id: number;
    export let title: string;
    export let poster: string;
    export let rating: number;
    export let releaseDate: string;

    let isFavorite: boolean = false;
    let loading: boolean = false;

    async function toggleFavorite() {
        loading = true;
        console.log('KLICKAD! isFavorite:', isFavorite, 'id:', id);
        try {
            if (isFavorite) {
                console.log('Skickar DELETE...');
                await fetch(`http://localhost:3000/api/favorites/${id}`, {
                    method: 'DELETE'
                });
                isFavorite = false;
            } else {
                console.log('Skickar POST med:', { movieId: id, title });
                const response = await fetch('http://localhost:3000/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movieId: id, title })
                });
                console.log('Svar:', response.status);
                if (response.ok) {
                    isFavorite = true;
                }
            }
        } catch (error) {
            console.error('Fel:', error);
        } finally {
            loading = false;
        }
    }
</script>

<div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
    <img src={poster} alt={title} class="w-full h-64 object-cover"/>
    <div class="p-4">
        <h3 class="text-white font-bold truncate">{title}</h3>
        <p class="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</p>
        <p class="text-gray-400 text-xs">{releaseDate}</p>
        <button
            on:click={toggleFavorite}
            disabled={loading}
            class={`mt-3 w-full py-2 rounded font-bold transition ${
                isFavorite
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
        >
            {loading ? '...' : isFavorite ? '❤️ Favoritmarkerad' : '🤍 Favoritmarkera'}
        </button>
    </div>
</div>