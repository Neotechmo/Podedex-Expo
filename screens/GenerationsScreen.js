import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { GENERATIONS } from "../constants/generations";
import { COLORS } from "../constants/colors";

export default function GenerationsScreen({ navigation }) {
  const handleSelectGeneration = (generation) => {
    navigation.navigate("Pokedex", { generation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generaciones</Text>
        <Text style={styles.subtitle}>Región de Pokémon</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {GENERATIONS.map((generation) => (
            <TouchableOpacity
              key={generation.id}
              style={styles.card}
              onPress={() => handleSelectGeneration(generation)}
              activeOpacity={0.7}
            >
              <View style={styles.generationNumber}>
                <Text style={styles.numberText}>Gen</Text>
                <Text style={styles.numberLarge}>{generation.id}</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{generation.name}</Text>
                <Text style={styles.cardRegion}>📍 {generation.region}</Text>

                <View style={styles.statsRow}>
                  <Text style={styles.pokemonCount}>{generation.limit}</Text>
                  <Text style={styles.pokemonLabel}>Pokémon</Text>
                </View>

                <View style={styles.rangeContainer}>
                  <Text style={styles.rangeText}>
                    #{generation.offset + 1} - #{generation.offset + generation.limit}
                  </Text>
                </View>
              </View>

              <View style={styles.arrow}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.white,
    marginTop: 8,
    opacity: 0.85,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
    paddingBottom: 36,
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  generationNumber: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  numberText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.white,
    opacity: 0.9,
  },
  numberLarge: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    marginTop: -4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardRegion: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 8,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  pokemonCount: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
    marginRight: 4,
  },
  pokemonLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: "600",
  },
  rangeContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  rangeText: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: "700",
  },
  arrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "300",
  },
});
