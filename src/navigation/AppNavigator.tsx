import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GeminiScreen from '../screens/GeminiScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Gemini" component={GeminiScreen} options={{ title: 'Gemini AI' }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
