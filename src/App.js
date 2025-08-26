import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [streams, setStreams] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchAnime = async () => {
    setLoading(true);
    const res = await fetch(`/api/anime/search/${query}`);
    const data = await res.json();
    setResults(data.data || []);
    setLoading(false);
  };

  const selectAnime = async (anime) => {
    setSelected(anime);
    setStreams(null);
    setLoading(true);
    const res = await fetch(`/api/anime/${anime.mal_id}/streams`);
    const data = await res.json();
    setStreams(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Anime Streaming App</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
        style={{ width: '60%', padding: 8 }}
      />
      <button onClick={searchAnime} style={{ padding: 8, marginLeft: 8 }}>Search</button>
      <div style={{ marginTop: 24 }}>
        {loading ? <p>Loading...</p> : null}
        {results.map(anime => (
          <div key={anime.mal_id} style={{ borderBottom: '1px solid #ccc', marginBottom: 10, cursor: 'pointer' }} onClick={() => selectAnime(anime)}>
            <strong>{anime.title}</strong> {anime.year ? `(${anime.year})` : ''}<br />
            <small>{anime.type} • {anime.episodes} ep</small>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: 24 }}>
          <h3>{selected.title}</h3>
          <img src={selected.images?.jpg?.image_url} alt={selected.title} style={{ width: 150 }} />
          <p>{selected.synopsis}</p>
          {streams && streams.episodes ? (
            <>
              <h4>Episodes</h4>
              <ul>
                {streams.episodes.map(ep => (
                  <li key={ep.id}><a href={ep.url} target="_blank" rel="noopener noreferrer">{ep.number}: {ep.title}</a></li>
                ))}
              </ul>
            </>
          ) : streams && <p>No stream data found.</p>}
        </div>
      )}
    </div>
  );
}

export default App;