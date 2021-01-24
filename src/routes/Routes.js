import React from 'react';

/* library */
import {createStackNavigator} from '@react-navigation/stack';

/* component */
import NavBottom from './NavBottom';
import Detail from '../pages/Detail';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="NavBottom" component={NavBottom} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default Routes;
