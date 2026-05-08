<script lang="ts">
    export let title: string;
    export let poster: string;
    export let rating: number;
    export let releaseDate: string;
</script>

<div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
    <img src={poster} alt={title} class="w-full h-64 object-cover"/>
    <div class="p-4">
        <h3 class="text-white font-bold truncate">{title}</h3>
        <p class="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</p>
        <p class="text-gray-400 text-xs">{releaseDate}</p>
    </div>
</div>