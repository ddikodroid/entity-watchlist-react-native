import axios from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Alert, FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoutesParamList} from '../routes/app-routes';
import {COLORS, SPACING} from '../styles';
import {EmptyPlaceholder, SearchBar, SearchEntityCard} from '../components';
import {API_BASE_URL} from '../../env';
import {store} from '../stores/index';

type Props = NativeStackScreenProps<AppRoutesParamList, 'Search'>;

export interface IEntity {
  country: string;
  currency: string;
  exchange: string;
  exchange_timezone: string;
  instrument_name: string;
  instrument_type: string;
  mic_code: string;
  symbol: string;
}

const SearchScreen = ({navigation}: Props) => {
  const searchBarRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const entities = store.useEntities();
  const addEntity = store.useAddEntity();

  useFocusEffect(
    useCallback(() => {
      searchBarRef?.current?.focus();
    }, []),
  );

  const searchSymbol = async ({text}: {text: string}) => {
    console.log(text);
    if (text === '') {
      return Alert.alert(
        'Keyword empty.',
        'You need to type the entity code/name before pressing the search button.',
      );
    }
    try {
      setIsSearching(true);
      const res = await axios.get(
        `${API_BASE_URL}/symbol_search?symbol=${text}`,
      );
      setResult(res.data.data);
      searchBarRef?.current?.blur();
    } catch (error) {
      console.log(error);
    } finally {
      searchBarRef?.current?.clear();
    }
  };

  const renderResult = ({item}: {item: IEntity}) => {
    return (
      <SearchEntityCard
        symbol={item.symbol}
        exchange={item.exchange}
        name={item.instrument_name}
        selected={entities.some(
          e =>
            `${e.symbol}:${e.exchange}` === `${item.symbol}:${item.exchange}`,
        )}
        onPress={() => addEntity(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        ref={searchBarRef}
        placeholder="Search entity"
        onChangeText={t => setKeyword(t)}
        onSubmitEditing={e => {
          e.preventDefault();
          searchSymbol({text: e.nativeEvent.text});
        }}
        returnKeyType="search"
      />
      <FlatList
        data={result}
        renderItem={renderResult}
        contentContainerStyle={{paddingBottom: SPACING.xl}}
        ListEmptyComponent={
          <>
            {isSearching ? (
              <EmptyPlaceholder
                title="Entity not found."
                text="Try to search with different entity code or name."
              />
            ) : null}
          </>
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
