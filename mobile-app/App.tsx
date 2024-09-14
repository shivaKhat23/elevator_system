import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './config/store';
import Home from './screens/Home';


export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ebf1'
  },
});
