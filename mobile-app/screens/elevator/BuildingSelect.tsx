import { getBuildings } from '@/services/api';
import { Building, BuildingScreenNavigationProps } from '@/types/types';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

export default function BuildingSelect() {
  const navigation = useNavigation<BuildingScreenNavigationProps>();

  const { data: buildings = [], isLoading: isBuildingLoading } = useQuery(
    ['buildings'],
    getBuildings,
  );

  function handleBuildingSelect({ id, name }: Building) {
    navigation.navigate('Floor', { buildingId: id, buildingName: name });
  }

  if (isBuildingLoading) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView style={styles.container}>
      {buildings.map((b) => (
        <Pressable key={b.id} onPress={() => handleBuildingSelect(b)} style={styles.building}>
          <Text>{b.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  building: {
    margin: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 4,
  },
});
