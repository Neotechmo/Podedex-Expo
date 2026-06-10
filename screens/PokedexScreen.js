import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPokemonDetail, getPokemonList } from "../api/pokeApi";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import { COLORS } from "../constants/colors";
import { GENERATIONS } from "../constants/generations";
import { getPokemonIdFromUrl } from "../utils/pokemonUtils";

const POKEMON_PER_PAGE = 20;
let savedSearchText = "";

export default function PokedexScreen({ navigation, route }) {
  const initialGeneration = route?.params?.generation || GENERATIONS[0];

  const [allPokemonList, setAllPokemonList] = useState([]);
  const [displayedList, setDisplayedList] = useState([]);
  const [searchText, setSearchText] = useState(savedSearchText);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGeneration, setSelectedGeneration] =
    useState(initialGeneration);
  const [currentPage, setCurrentPage] = useState(0);
  const pokemonDetailCache = useRef({});
  const requestIdRef = useRef(0);

  useEffect(() => {
    loadPokemonByGeneration(initialGeneration);
  }, []);

  const filteredPokemonList = useMemo(() => {
    if (!searchText) {
      return allPokemonList;
    }

    const lowerText = searchText.toLowerCase();

    return allPokemonList.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(lowerText);
      const matchesId = String(pokemon.id).includes(lowerText);
      return matchesName || matchesId;
    });
  }, [allPokemonList, searchText]);

  useEffect(() => {
    const loadCurrentPageDetails = async () => {
      if (allPokemonList.length === 0) {
        setDisplayedList([]);
        setPageLoading(false);
        return;
      }

      const start = currentPage * POKEMON_PER_PAGE;
      const end = start + POKEMON_PER_PAGE;
      const pageItems = filteredPokemonList.slice(start, end);
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      if (pageItems.length === 0) {
        setDisplayedList([]);
        setPageLoading(false);
        return;
      }

      setPageLoading(true);
      setDisplayedList([]);

      try {
        const detailedPokemon = await Promise.all(
          pageItems.map(async (pokemon) => {
            if (pokemonDetailCache.current[pokemon.id]) {
              return pokemonDetailCache.current[pokemon.id];
            }

            const detail = await getPokemonDetail(pokemon.name);
            pokemonDetailCache.current[pokemon.id] = detail;
            return detail;
          }),
        );

        if (requestIdRef.current === requestId) {
          setDisplayedList(detailedPokemon);
        }
      } catch (err) {
        if (requestIdRef.current === requestId) {
          setError(err.message || "Error al cargar Pokémon");
        }
      } finally {
        if (requestIdRef.current === requestId) {
          setPageLoading(false);
        }
      }
    };

    loadCurrentPageDetails();
  }, [currentPage, filteredPokemonList, allPokemonList.length]);

  const loadPokemonByGeneration = async (generation) => {
    requestIdRef.current += 1;
    setLoading(true);
    setPageLoading(false);
    setError(null);
    setAllPokemonList([]);
    setDisplayedList([]);
    setCurrentPage(0);

    try {
      const listData = await getPokemonList(
        generation.limit,
        generation.offset,
      );
      const pokemonBaseList = listData.results.map((pokemon) => ({
        ...pokemon,
        id: Number(getPokemonIdFromUrl(pokemon.url)),
      }));

      setAllPokemonList(pokemonBaseList);
      setSelectedGeneration(generation);
    } catch (err) {
      setError(err.message || "Error al cargar Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    savedSearchText = text;
    setSearchText(text);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalFiltered = filteredPokemonList.length;
  const maxPage = Math.max(1, Math.ceil(totalFiltered / POKEMON_PER_PAGE));

  if (loading) {
    return <LoadingMessage message="Cargando Pokémon..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => loadPokemonByGeneration(selectedGeneration)}
      />
    );
  }

  const renderListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{selectedGeneration.name}</Text>
        <Text style={styles.region}>{selectedGeneration.region}</Text>
        <Text style={styles.count}>{totalFiltered} Pokémon</Text>
      </View>

      <View style={styles.generationsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.generationsScroll}
        >
          <View style={styles.generationsList}>
            {GENERATIONS.map((gen) => (
              <TouchableOpacity
                key={gen.id}
                style={[
                  styles.generationButton,
                  selectedGeneration.id === gen.id &&
                    styles.generationButtonActive,
                ]}
                onPress={() => loadPokemonByGeneration(gen)}
              >
                <Text
                  style={[
                    styles.generationButtonText,
                    selectedGeneration.id === gen.id &&
                      styles.generationButtonTextActive,
                  ]}
                >
                  Gen {gen.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );

  const renderListFooter = () => {
    if (pageLoading) {
      return (
        <View style={styles.pageLoading}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.pageLoadingText}>Cargando página...</Text>
        </View>
      );
    }

    if (displayedList.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron Pokémon</Text>
          <Text style={styles.emptySubtext}>
            Intenta con otro nombre o número
          </Text>
        </View>
      );
    }

    return (
      <>
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 0 && styles.paginationButtonDisabled,
            ]}
            onPress={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === 0 && styles.paginationButtonTextDisabled,
              ]}
            >
              ← Anterior
            </Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            Página {currentPage + 1} de {maxPage}
          </Text>

          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage >= maxPage - 1 && styles.paginationButtonDisabled,
            ]}
            onPress={handleNextPage}
            disabled={currentPage >= maxPage - 1}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage >= maxPage - 1 &&
                  styles.paginationButtonTextDisabled,
              ]}
            >
              Siguiente →
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Buscar por nombre o número..."
      />

      <FlatList
        data={displayedList}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              navigation.navigate("PokemonDetail", { pokemonId: item.id })
            }
          />
        )}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={
          displayedList.length > 0 ? styles.columnWrapper : null
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
  },
  region: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.85,
    marginTop: 4,
    fontWeight: "500",
  },
  count: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.7,
    marginTop: 2,
  },
  generationsWrapper: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  generationsScroll: {
    paddingVertical: 8,
  },
  generationsList: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8,
  },
  generationButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  generationButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  generationButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },
  generationButtonTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    paddingHorizontal: 8,
  },
  emptyContainer: {
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
  },
  pageLoading: {
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  pageLoadingText: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
  },
  paginationButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 0.3,
    alignItems: "center",
  },
  paginationButtonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  paginationButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 12,
  },
  paginationButtonTextDisabled: {
    color: COLORS.muted,
  },
  pageInfo: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    flex: 0.4,
  },
  bottomSpacer: {
    height: 24,
  },
});
