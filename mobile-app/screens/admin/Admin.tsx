import { View, Text, StyleSheet } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
  },
});
