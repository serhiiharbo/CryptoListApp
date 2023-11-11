import React, {useState, useEffect, FC} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet, Image} from 'react-native';

const API_ENDPOINT: string = 'https://dev.bitfrost.io:8443/assets.get/';

interface Asset {
  symbol: string;
  display_symbol: string;
  name: string;
  type: string;
  decimals: number;
  icon_url: string;
  status: string;
}

interface ApiResponse {
  assets: Asset[];
}

type TAssetsState = [Asset[], React.Dispatch<React.SetStateAction<Asset[]>>];
type TSearchTerm = [string, React.Dispatch<React.SetStateAction<string>>];

const CryptoList: FC = () => {
  const [assets, setAssets]: TAssetsState = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets]: TAssetsState = useState<Asset[]>(
    [],
  );
  const [searchTerm, setSearchTerm]: TSearchTerm = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw Error('Failed to fetch data');
        }

        const data: ApiResponse = await response.json();

        setAssets(data.assets);
        setFilteredAssets(data.assets);
      } catch (error: unknown) {
        // @ts-ignore
        throw Error(`Error fetching data: ${error?.message}`);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = assets.filter(asset =>
      asset.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredAssets(filtered);
  };

  const renderItem = ({item}: {item: Asset}) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.symbol}</Text>
        <Text>{item.name}</Text>
        <Image
          source={{uri: item.icon_url}}
          style={{position: 'absolute', right: 0, width: 40, height: 40}}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by asset name"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        // contentContainerStyle={styles.flatListContainer}
        data={filteredAssets}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CryptoList;
