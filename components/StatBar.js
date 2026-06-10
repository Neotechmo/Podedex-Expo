import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function StatBar({ label, value, maxValue = 200 }) {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            { width: `${Math.min(percentage, 100)}%` },
          ]}
        />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    width: 100,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    width: 40,
    textAlign: "right",
  },
});
