import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { formatPokemonId, capitalize, getOfficialArtwork } from "../utils/pokemonUtils";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon, onPress }) {
  if (!pokemon) return null;

  const image = getOfficialArtwork(pokemon);
  const types = pokemon.types || [];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.idBadge}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
      </View>

      <View style={styles.imageWrapper}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {capitalize(pokemon.name)}
        </Text>
        <View style={styles.typesContainer}>
          {types.slice(0, 2).map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: 6,
    padding: 12,
    flex: 0.48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  idBadge: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  id: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.primary,
    backgroundColor: "#FFE5E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageWrapper: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    flexWrap: "wrap",
  },
});
