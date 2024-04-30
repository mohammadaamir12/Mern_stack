import { View, Text } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeLists from './src/screens/EmployeeLists';
import Addemployee from './src/screens/Addemployee';
import MarkAttendance from './src/screens/MarkAttendance';
import User from './src/screens/User';
import Summary from './src/screens/Summary';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EmployeeLists" component={EmployeeLists} />
        <Stack.Screen name="Addemployee" component={Addemployee} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Summary" component={Summary} />

        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App