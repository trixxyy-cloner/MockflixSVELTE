<script lang="ts">
  import { onMount } from 'svelte';
  import MovieCard from './lib/MovieCard.svelte';
  import { getPopularMovies, getImageUrl, searchMovies } from './lib/api';

  let movies: any[] = [];
  let loading: boolean = true;
  let error: string = '';
  let searchQuery: string = '';

  onMount(async () => {
    loadMovies();
  });

  async function loadMovies() {
    loading = true;
    try {
      const data = await getPopularMovies();
      movies = data;
    } catch (err) {
      error = 'Fel vid hämtning av filmer';
    } finally {
      loading = false;
    }
  }

  async function handleSearch() {
    if (searchQuery.trim() === '') {
      loadMovies();
      return;
    }
    
    loading = true;
    try {
      const data = await searchMovies(searchQuery);
      movies = data;
    } catch (err) {
      error = 'Fel vid sökning';
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-gray-900 min-h-screen text-white">
  <header class="bg-black p-6 border-b-4 border-red-600">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 text-red-600">🎬 Mockflix</h1>
      <div class="flex gap-2">
        <input
          bind:value={searchQuery}
          placeholder="Sök efter filmer..."
          on:keydown={(e) => e.key === 'Enter' && handleSearch()}
          class="flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-red-600 focus:outline-none focus:border-red-500"
        />
        <button
          on:click={handleSearch}
          class="bg-red-600 text-white font-bold px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Sök
        </button>
      </div>
    </div>
  </header>

  <main class="p-6 max-w-7xl mx-auto">
    {#if loading}
      <p class="text-center text-lg">Laddar filmer...</p>
    {:else if error}
      <p class="text-center text-red-500">{error}</p>
    {:else if movies.length === 0}
      <p class="text-center text-gray-400">Inga filmer hittades</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each movies as movie (movie.id)}
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster={getImageUrl(movie.poster_path)}
            rating={movie.vote_average}
            releaseDate={movie.release_date}
          />
        {/each}
      </div>
    {/if}
  </main>
</div>