import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Button, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ! UseState fix 
// picker menu color is not dark mode

// ! NOT TESTED


const ConfigScreen = () => {
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [stream, setStream] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    setHasChanges(true);
  }, [temperature, maxTokens, stream]);

  const loadConfig = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@chatConfig');
      if (jsonValue != null) {
        const config = JSON.parse(jsonValue);
        setTemperature(config.temperature);
        setMaxTokens(config.max_tokens);
        setStream(config.stream);
      }
    } catch (e) {
      Alert.alert('Error', 'Unable to load configuration');
    }
  };

  const saveChanges = async () => {
    try {
      const newConfig = {
        temperature: temperature,
        max_tokens: maxTokens,
        stream: stream
      };
      await AsyncStorage.setItem('@chatConfig', JSON.stringify(newConfig));
      setHasChanges(false);
    } catch (e) {
      Alert.alert('Error', 'Unable to save changes');
    }
  };

  const discardChanges = () => {
    loadConfig();
    setHasChanges(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput 
          style={styles.input} 
          placeholder="Temperature" 
          keyboardType="numeric"
          onChangeText={text => setTemperature(parseFloat(text))}
          value={String(temperature)}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Max Tokens" 
          keyboardType="numeric"
          onChangeText={text => setMaxTokens(parseInt(text, 10))}
          value={String(maxTokens)}
        />
        <Picker
          selectedValue={stream}
          color='white'
          style={styles.picker}
          onValueChange={(itemValue, ) => setStream(itemValue)}
          dropdownIconColor={'white'}
          selectionColor={"#212124"}
            
        >
          <Picker.Item label="True" value={true} />
          <Picker.Item label="False" value={false} />
        </Picker>
        <View style={styles.buttonContainer}>
        <Button style={styles.saveButton} title="Save" onPress={saveChanges} disabled={!hasChanges} />
        <Button style={styles.discardButton} title="Discard" onPress={discardChanges} disabled={!hasChanges} />
        </View>      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#161618',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    width: '80%',
    marginBottom: 10,
    padding: 10,
    color: 'white',
  },
  picker: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  saveButton: {
    flexDirection: 'row',
    width: '48%',
  },
  discardButton: {
    flexDirection: 'row',
    width: '48%',
    
  },
});

export default ConfigScreen;