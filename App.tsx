import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ErrorBoundary} from 'react-error-boundary';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CryptoList from './src/CryptoList';

type TError = any;
type TErrorObj = {
  error: TError;
};
type TBackgroundStyle = {
  backgroundColor: any;
};

function Fallback({error}: TErrorObj) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Something went wrong:</Text>
      <Text style={{color: 'red'}}>{error.message}</Text>
    </View>
  );
}

const App = () => {
  const isDarkMode: boolean = useColorScheme() === 'dark';

  const backgroundStyle: TBackgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ErrorBoundary FallbackComponent={Fallback}>
        <CryptoList />
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
