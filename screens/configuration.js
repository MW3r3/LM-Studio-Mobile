import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Text,
} from "react-native";



const ConfigScreen = ({ navigation }) => {
  const [stream, setStream] = useState(false);
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(300);

  const saveChanges = () => {
    const temp = parseFloat(temperature);
    const tokens = parseInt(maxTokens, 10);
  
    if (isNaN(temp) || isNaN(tokens)) {
      Alert.alert('Invalid input');
    } else {
      navigation.navigate('Chat', {
        temperature: temp,
        maxTokens: tokens,
        stream: stream,
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>
          <Text style={styles.text}>Temperature: </Text>
          {temperature}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Temperature"
          keyboardType="numeric"
          onChangeText={(text) => setTemperature(text)}
          value={String(temperature)}
        />
        <Text>
          <Text style={styles.text}>Max Tokens: </Text>
          {maxTokens}
        </Text>
    
        <TextInput
          style={styles.input}
          placeholder="Max Tokens"
          keyboardType="numeric"
          onChangeText={(text) => setMaxTokens(text)}
          value={String(maxTokens)}
        />
        <Text style={styles.text}>Stream: </Text>
        

        <TextInput
          style={styles.input}
          placeholder="Stream"
          onChangeText={(text) => setStream(text)}
          value={String(stream)}
        />
        <Button title="Save" onPress={saveChanges} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161618",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    width: "80%",
    marginBottom: 10,
    padding: 10,
    color: "white",
  },
  picker: {
    height: 40,
    width: "80%",
    marginBottom: 10,
    color: "white",
  },
});

export default ConfigScreen;
