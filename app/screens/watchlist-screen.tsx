import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ICONS} from '../assets';
import {
  Button,
  DummySearchBar,
  EmptyPlaceholder,
  FilterCard,
  IconButton,
  WatchlistCard,
} from '../components';
import {AppRoutesParamList} from '../routes/app-routes';
import {COLORS, SPACING} from '../styles';
import {store} from '../stores';
import {wait} from '../helpers/wait';
import {IEntity} from './search-screen';
import {API_KEY} from '../../env';

type Props = NativeStackScreenProps<AppRoutesParamList, 'Watchlist'>;

interface IWatchlist {
  symbol: string;
  currency_base: string;
  currency_quote: string;
  type: string;
  timestamp: Date;
  price: number;
}

const WatchlistScreen = ({navigation}: Props) => {
  const entities = store.useEntities();
  const watchlist = store.useWatchlist();
  const removeEntity = store.useRemoveEntity();
  const setEntities = store.useSetEntities();
  const updateWatchlist = store.useUpdateWatchlist();

  const [refreshing, setRefreshing] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  console.log('Entities: ', entities);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getWatchlistData();
  }, []);

  const getWatchlistData = () => {
    const ws = new WebSocket(
      `wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`,
    );

    const symbols = entities.map(entity => {
      return entity.symbol;
    });
    console.log('Symbols:', symbols);
    ws.onopen = async () => {
      console.log('onOpen');
      if (symbols.length !== 0) {
        ws.send(
          JSON.stringify({
            action: 'subscribe',
            params: {
              symbols: symbols.join(','),
            },
          }),
        );
      }
    };
    ws.onmessage = e => {
      const res = JSON.parse(e.data);
      console.log(`onMessage: ${JSON.stringify(res)}`);
      if (res.event === 'price') {
        updateWatchlist(res);
      }
    };
    wait(4000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    getWatchlistData();
  }, [entities, watchlist]);

  const onPressWatchlist = (entity: IEntity) => {
    Alert.alert(
      `Remove ${entity.symbol}`,
      'Entity will be removed from watchlist. Do you want to continue?',
      [
        {
          text: 'Remove',
          onPress: () => {
            removeEntity(entity);
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const renderWatchlist = ({item}: {item: IWatchlist}) => {
    return (
      <WatchlistCard
        symbol={item.symbol}
        price={item.price}
        timestamp={item.timestamp}
        onPress={() => onPressWatchlist(item)}
      />
    );
  };

  const sortWatchlist = ({
    type,
    order,
  }: {
    type: 'price' | 'symbol';
    order: 'ascending' | 'descending';
  }) => {
    if (type === 'price') {
      const list = [
        ...watchlist.filter(
          (value, index, arr) =>
            arr.findLastIndex(_value => _value.symbol === value.symbol) ===
            index,
        ),
      ];

      const watchlistSortedByPrice = list.sort((a, b) => {
        return order === 'ascending'
          ? a.price < b.price
            ? 1
            : -1
          : a.price > b.price
          ? 1
          : -1;
      });

      let sortedByPrice: IEntity[] = [];
      watchlistSortedByPrice.map(w => {
        const found = entities.find(e => {
          return w.symbol === e.symbol;
        });
        sortedByPrice.push(found);
      });

      setEntities(sortedByPrice);
    } else if (type === 'symbol') {
      console.log('Sort Symbol');
      const list = [...entities];
      const sortedBySymbol = list.sort((a, b) => {
        return order === 'ascending'
          ? a.symbol < b.symbol
            ? 1
            : -1
          : a.symbol > b.symbol
          ? 1
          : -1;
      });
      setEntities(sortedBySymbol);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <DummySearchBar onPress={() => navigation.navigate('Search')} />
        <IconButton
          source={ICONS.filter}
          iconStyle={styles.filterButton}
          onPress={() => setModalOpened(prev => !prev)}
        />
      </View>
      <FlatList
        data={watchlist.filter(
          (value, index, arr) =>
            arr.findLastIndex(_value => _value.symbol === value.symbol) ===
            index,
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.blue}
          />
        }
        renderItem={renderWatchlist}
        ListEmptyComponent={
          <EmptyPlaceholder
            title="Watchlist is empty."
            text={'You can find and add entity from the search screen.'}
          />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpened}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalOpened(prev => !prev);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Filter</Text>
            <FilterCard
              label="Symbol"
              onAscending={() =>
                sortWatchlist({type: 'symbol', order: 'ascending'})
              }
              onDescending={() =>
                sortWatchlist({type: 'symbol', order: 'descending'})
              }
            />
            <FilterCard
              label="Price"
              onAscending={() =>
                sortWatchlist({type: 'price', order: 'ascending'})
              }
              onDescending={() =>
                sortWatchlist({type: 'price', order: 'descending'})
              }
            />
            <Button
              label="Done"
              onPress={() => setModalOpened(prev => !prev)}
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  modalView: {
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 16,
    shadowOpacity: 0.2,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: SPACING.s,
  },
});
