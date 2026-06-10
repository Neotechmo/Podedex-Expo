const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de Pokémon");
  }

  return response.json();
}

export async function getPokemonDetail(nameOrId) {
  const response = await fetch(
    `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle del Pokémon");
  }

  return response.json();
}

export async function getPokemonSpecies(nameOrId) {
  const response = await fetch(
    `${BASE_URL}/pokemon-species/${String(nameOrId).toLowerCase()}`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la descripción del Pokémon");
  }

  return response.json();
}

export async function getPokemonType(typeName) {
  const response = await fetch(`${BASE_URL}/type/${typeName}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la información del tipo");
  }

  return response.json();
}
