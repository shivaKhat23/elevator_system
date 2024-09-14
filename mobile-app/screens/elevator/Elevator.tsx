import { getBuildings, getFloors, getLifts } from '@/services/api';
import { View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';

export default function Elevator() {
  const { data: buildings = [], isLoading: isBuildingLoading } = useQuery(
    ['buildings'],
    getBuildings,
  );
  const buildingId = buildings?.[0]?.id;

  const { data: floors = [], isLoading: isFloorLoading } = useQuery(
    ['floors', buildingId],
    () => getFloors(buildingId),
    { enabled: !!buildingId },
  );

  const { data: lifts = [], isLoading: isLiftLoading } = useQuery(
    ['lifts', buildingId],
    () => getLifts(buildingId),
    {
      enabled: !!buildingId,
      refetchInterval: 2000,
    },
  );

  if (isBuildingLoading || isFloorLoading || isLiftLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <View>
        {buildings.map((b) => (
          <Text key={b.id}>{b.name}</Text>
        ))}
      </View>
      <View>
        {floors.map((f) => (
          <Text key={f.id}>{f.number}</Text>
        ))}
      </View>
      <View>
        {lifts.map((l) => (
          <Text key={l.id}>
            {l.name} {l.currentFloorNumber}
          </Text>
        ))}
      </View>
    </View>
  );
}
