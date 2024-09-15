import { getFloors } from '@/services/api';
import { Floor, FloorScreenNavigationProps, FloorScreenRouteProps } from '@/types/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useQuery } from 'react-query';

export default function FloorSelect() {
  const route = useRoute<FloorScreenRouteProps>();
  const navigation = useNavigation<FloorScreenNavigationProps>();

  const buildingId = route.params.buildingId;
  const buildingName = route.params.buildingName;

  const { data: floors = [], isLoading: isFloorLoading } = useQuery(
    ['floors', buildingId],
    () => getFloors(buildingId),
    { enabled: !!buildingId },
  );

  function handleFloorSelect({ id, number }: Floor) {
    navigation.navigate('Elevator', {
      buildingId: buildingId,
      buildingName: buildingName,
      floorId: id,
      floorNumber: number,
    });
  }

  if (isFloorLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buildingTitle}>
        <Text> {buildingName}</Text>
      </View>
      <ScrollView>
        <View style={styles.floorContainer}>
          {floors.map((f) => (
            <Pressable key={f.id} onPress={() => handleFloorSelect(f)} style={styles.floor}>
              <Text>{f.number}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buildingTitle: {
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
  floorContainer: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  floor: {
    flexBasis: 60,
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
