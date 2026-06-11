// Frontend - Main App Component (React Native)
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Mock Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProjectDetailScreen from './screens/ProjectDetailScreen';
import CreateProjectScreen from './screens/CreateProjectScreen';
import AICoCreationScreen from './screens/AICoCreationScreen';
import PublishScreen from './screens/PublishScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#3498DB',
            tabBarInactiveTintColor: '#95A5A6'
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Projects',
              tabBarIcon: ({ color }) => <Text style={{ color }}>📁</Text>
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateProjectScreen}
            options={{
              tabBarLabel: 'Create',
              tabBarIcon: ({ color }) => <Text style={{ color }}>➕</Text>
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

import { Text } from 'react-native';
const ProfileScreen = () => <Text>Profile</Text>;
