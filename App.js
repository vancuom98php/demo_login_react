import 'react-native-gesture-handler';
import React, { useMemo, useReducer, useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './components/context';

import { SideBar, StackScreen, Home } from './screens';

const Drawer = createDrawerNavigator();

const App = () => {
  const initialLoginState = {
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    login: async (foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const email = foundUser[0].email;

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userEmail', email);
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: 'LOGIN', id: email, token: userToken });
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={props => <SideBar {...props} />}
          >
            <Drawer.Screen name="Home" component={Home} />
          </Drawer.Navigator>
        ) : <StackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;