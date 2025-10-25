import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import StatsScreen from "./src/screens/StatsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Финансы" }}
                />
                <Stack.Screen
                    name="Add"
                    component={AddEntryScreen}
                    options={{ title: "Новая операция" }}
                />
                <Stack.Screen
                    name="Stats"
                    component={StatsScreen}
                    options={{ title: "Статистика" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
