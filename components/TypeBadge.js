import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TYPE_COLORS } from "../constants/colors";
import { capitalize } from "../utils/pokemonUtils";

export default function TypeBadge({ type }) {
  const backgroundColor = TYPE_COLORS[type] || "#999";

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{capitalize(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
    textTransform: "capitalize",
  },
});
