import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ICONS} from '../assets';
import {DummySearchBar, EmptyPlaceholder, IconButton} from '../components';
import {AppRoutesParamList} from '../routes/app-routes';
import {COLORS, SPACING} from '../styles';
import {API_KEY} from '../../env';
import {store} from '../stores';

type Props = NativeStackScreenProps<AppRoutesParamList, 'Watchlist'>;

const ws = new WebSocket(
  `wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`,
);

const WatchlistScreen = ({navigation}: Props) => {
  // const entities = store.useEntities();
  // const watchlist = store.useWatchlist();
  // const updateWatchlist = store.useUpdateWatchlist();

  // const renderWatchlist = ({item}) => {
  //   return <Text>{item.symbol}</Text>;
  // };

  //TODO: integrate with Websocket
  return (
    <View style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <DummySearchBar onPress={() => navigation.navigate('Search')} />
        <IconButton source={ICONS.filter} iconStyle={styles.filterButton} />
      </View>
      <FlatList
        data={[]}
        // renderItem={renderWatchlist}
        ListEmptyComponent={
          <EmptyPlaceholder
            title="Watchlist is empty."
            text={'You can find and add entity from the search screen.'}
          />
        }
      />
    </View>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
  },
  filterButton: {
    marginStart: SPACING.md,
  },
});
