import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button
        title="Acessar Gemini API"
        onPress={() => navigation.navigate('Gemini')}
      />
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
