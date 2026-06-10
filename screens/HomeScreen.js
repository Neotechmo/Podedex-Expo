import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.emoji}>🔴</Text>
        <Text style={styles.title}>Pokédex Expo</Text>
        <Text style={styles.subtitle}>
          Explora el mundo de los Pokémon con la PokeAPI
        </Text>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>📋</Text>
          <Text style={styles.cardTitle}>Ver Pokédex</Text>
          <Text style={styles.cardDesc}>Explora la lista completa de Pokémon</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Pokedex")}
          >
            <Text style={styles.buttonText}>Comenzar →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🗺️</Text>
          <Text style={styles.cardTitle}>Por Generaciones</Text>
          <Text style={styles.cardDesc}>Filtra por región y generación</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate("Generations")}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Explorar →
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Datos en tiempo real desde PokeAPI</Text>
        <Text style={styles.footerSmall}>Proyecto Escolar • React Native + Expo</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    backgroundColor: COLORS.primary,
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "center",
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  buttonTextSecondary: {
    color: COLORS.white,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "600",
  },
  footerSmall: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
    opacity: 0.7,
  },
});
