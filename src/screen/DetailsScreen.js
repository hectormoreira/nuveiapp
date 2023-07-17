import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>DetailsScreen</Text>

      <Button
        style={styles.btn}
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        style={styles.btn}
        title="Go back"
        onPress={() => navigation.goBack()}
      />

      <Button
        style={styles.btn}
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 50,
    display: "flex",
  },
});
