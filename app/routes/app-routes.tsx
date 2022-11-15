import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchScreen, WatchlistScreen} from '../screens';

type AppRoutesParamList = {
  Watchlist: undefined;
  Search: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<AppRoutesParamList>();

const AppRoutes: FC = () => {
  return (
    <Navigator>
      <Screen name="Watchlist" component={WatchlistScreen} />
      <Screen name="Search" component={SearchScreen} />
    </Navigator>
  );
};

export default AppRoutes;
