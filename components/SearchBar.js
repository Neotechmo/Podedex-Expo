import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Buscar Pokémon...",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {value ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => onChangeText("")}
            activeOpacity={0.7}
          >
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.icon}>
            <Text style={styles.iconText}>🔍</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: COLORS.primary,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 54,
    backgroundColor: COLORS.white,
    borderColor: "rgba(0, 0, 0, 0.08)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "600",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  iconText: {
    fontSize: 18,
  },
  clearText: {
    color: COLORS.muted,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 26,
  },
});
