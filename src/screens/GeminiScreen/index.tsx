import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

function GeminiScreen() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    try {
      const apiKey = 'AIzaSyDY3ULeZ2DZDCuhKBZqVcADpcpsu_WlyWg';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sem resposta';
      setResponse(generatedText);
    } catch (error) {
      console.error('Erro ao chamar Gemini API:', error);
      setResponse('Erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Gemini API</Text>

        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Digite seu prompt..."
          multiline
        />

        <Button title="Enviar" onPress={handleSubmit} disabled={loading} />

        {loading && <ActivityIndicator size="large" style={styles.loader} />}

        {response ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseTitle}>Resposta:</Text>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  loader: {
    marginVertical: 20,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  responseTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    lineHeight: 22,
  },
});

export default GeminiScreen;
