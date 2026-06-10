export function getPokemonIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function cleanPokemonDescription(text) {
  if (!text) return "Descripción no disponible.";
  return text.replace(/\n/g, " ").replace(/\f/g, " ");
}

export function getOfficialArtwork(pokemon) {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default
  );
}
