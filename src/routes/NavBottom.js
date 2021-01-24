import React from 'react';
import {StatusBar} from 'react-native';

/* library */
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* component/style */
import Home from '../pages/Home';
import Feed from '../pages/Feed';
import Cart from '../pages/Cart';
import Message from '../pages/Message';
import User from '../pages/User';
import {GRAY2, PURPLE, ORANGE, WHITE} from '../styles/Colors';

const Tab = createBottomTabNavigator();

const NavBottom = () => {
  return (
    <>
      <StatusBar backgroundColor={PURPLE} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: PURPLE,
          inactiveTintColor: GRAY2,
          labelStyle: {
            fontSize: 14,
            marginBottom: 10,
            fontWeight: 'bold',
          },
          style: {
            height: 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
          },
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? PURPLE : GRAY2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({focused}) => (
              <FontAwesome
                name="feed"
                size={24}
                color={focused ? PURPLE : GRAY2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({focused}) => (
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? PURPLE : GRAY2}
              />
            ),
            tabBarBadge: 1,
            tabBarBadgeStyle: {
              backgroundColor: ORANGE,
              color: ORANGE,
              borderWidth: 2,
              borderColor: WHITE,
            },
          }}
        />
        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color={focused ? PURPLE : GRAY2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({focused}) => (
              <Feather name="user" size={24} color={focused ? PURPLE : GRAY2} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default NavBottom;
