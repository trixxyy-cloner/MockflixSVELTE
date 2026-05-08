<script lang="ts">
  import { onMount } from 'svelte';
  import MovieCard from './lib/MovieCard.svelte';
  import { getPopularMovies, getImageUrl } from './lib/api';

  let movies: any[] = [];
  let loading: boolean = true;
  let error: string = '';

  onMount(async () => {
    try {
      const data = await getPopularMovies();
      movies = data;
    } catch (err) {
      error = 'Fel vid hämtning av filmer';
    } finally {
      loading = false;
    }
  });
</script>

<div class="bg-gray-900 min-h-screen text-white">
  <header class="bg-red-600 p-6 text-center">
    <h1 class="text-4xl font-bold">🎬 Mockflix</h1>
    <p class="text-gray-200">Dina favorit-filmer</p>
  </header>

  <main class="p-6">
    {#if loading}
      <p class="text-center text-lg">Laddar filmer...</p>
    {:else if error}
      <p class="text-center text-red-500">{error}</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each movies as movie (movie.id)}
          <MovieCard
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