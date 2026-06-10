import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { getPokemonDetail, getPokemonSpecies, getPokemonType } from "../api/pokeApi";
import { COLORS } from "../constants/colors";
import {
  formatPokemonId,
  capitalize,
  cleanPokemonDescription,
  getOfficialArtwork,
} from "../utils/pokemonUtils";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";

export default function PokemonDetailScreen({ route, navigation }) {
  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [typeInfo, setTypeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemonData();
  }, [pokemonId]);

  const loadPokemonData = async () => {
    setLoading(true);
    setError(null);

    try {
      const pokemonData = await getPokemonDetail(pokemonId);
      setPokemon(pokemonData);

      const speciesData = await getPokemonSpecies(pokemonId);
      setSpecies(speciesData);

      if (pokemonData.types?.length > 0) {
        const firstType = pokemonData.types[0].type.name;
        const typeData = await getPokemonType(firstType);
        setTypeInfo(typeData);
      }
    } catch (err) {
      setError(err.message || "Error al cargar detalles");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage message="Cargando detalles..." />;
  }

  if (error || !pokemon) {
    return (
      <ErrorMessage message={error || "No se encontró el Pokémon"} onRetry={loadPokemonData} />
    );
  }

  const image = getOfficialArtwork(pokemon);
  const description = species?.flavor_text_entries
    ? (() => {
        const esEntry = species.flavor_text_entries.find(
          (e) => e.language.name === "es"
        );
        const enEntry = species.flavor_text_entries.find(
          (e) => e.language.name === "en"
        );
        return cleanPokemonDescription(
          esEntry?.flavor_text || enEntry?.flavor_text || ""
        );
      })()
    : "Descripción no disponible.";

  const stats = pokemon.stats || [];
  const abilities = pokemon.abilities || [];
  const types = pokemon.types || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.headerBg,
            { backgroundColor: types.length > 0 ? COLORS.primary : COLORS.muted },
          ]}
        />

        <View style={styles.header}>
          <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <View style={styles.typesContainer}>
            {types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </View>
        </View>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.sectionRow}>
          <View style={[styles.section, styles.sectionHalf]}>
            <Text style={styles.sectionTitle}>Altura</Text>
            <Text style={styles.bigValue}>{pokemon.height / 10} m</Text>
          </View>
          <View style={[styles.section, styles.sectionHalf]}>
            <Text style={styles.sectionTitle}>Peso</Text>
            <Text style={styles.bigValue}>{pokemon.weight / 10} kg</Text>
          </View>
        </View>

        {abilities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            {abilities.map((ability, index) => (
              <View key={index} style={styles.abilityItem}>
                <Text style={styles.abilityName}>
                  {capitalize(ability.ability.name)}
                </Text>
                {ability.is_hidden && (
                  <Text style={styles.hiddenBadge}>Oculta</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          {stats.map((stat) => (
            <StatBar
              key={stat.stat.name}
              label={capitalize(stat.stat.name)}
              value={stat.base_stat}
              maxValue={255}
            />
          ))}
        </View>

        {typeInfo && (
          <>
            {typeInfo.damage_relations?.double_damage_to?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ventajas de tipo</Text>
                <View style={styles.badgesRow}>
                  {typeInfo.damage_relations.double_damage_to.map((t) => (
                    <TypeBadge key={t.name} type={t.name} />
                  ))}
                </View>
              </View>
            )}

            {typeInfo.damage_relations?.double_damage_from?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Desventajas de tipo</Text>
                <View style={styles.badgesRow}>
                  {typeInfo.damage_relations.double_damage_from.map((t) => (
                    <TypeBadge key={t.name} type={t.name} />
                  ))}
                </View>
              </View>
            )}
          </>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    zIndex: 0,
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: "center",
    zIndex: 1,
  },
  id: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  name: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 220,
    height: 220,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  sectionHalf: {
    flex: 1,
    margin: 0,
    marginHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.text,
  },
  bigValue: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
  },
  abilityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  abilityName: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: "600",
  },
  hiddenBadge: {
    fontSize: 9,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
    fontWeight: "700",
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  spacer: {
    height: 24,
  },
});
