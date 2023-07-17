import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { StyleSheet } from "react-native";
import AddCard from "../components/AddCard";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
      <AddCard />

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
