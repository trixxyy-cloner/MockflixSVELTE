import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let favorites: any[] = [];

app.post('/api/favorites', (req, res) => {
  console.log('POST /api/favorites - Body:', req.body);
  
  const { movieId, title } = req.body;
  
  if (!movieId || !title) {
    return res.status(400).json({ error: 'movieId och title är obligatoriska' });
  }
  
  // Kontrollera om redan sparad
  const exists = favorites.find(fav => fav.movieId === movieId);
  if (exists) {
    return res.status(400).json({ error: 'Redan favoritmarkerad' });
  }
  
  favorites.push({ movieId, title });
  console.log('Favoritmarkerad:', { movieId, title });
  res.status(200).json({ message: 'Sparad som favorit!', favorites });
});

app.get('/api/favorites', (req, res) => {
  console.log('GET /api/favorites');
  res.json(favorites);
});

app.delete('/api/favorites/:movieId', (req, res) => {
  console.log('DELETE /api/favorites/:movieId -', req.params.movieId);
  favorites = favorites.filter(fav => fav.movieId !== parseInt(req.params.movieId));
  res.json({ message: 'Borttagen från favoriter', favorites });
});

app.listen(3000, () => {
  console.log('Server körs på http://localhost:3000');
});
