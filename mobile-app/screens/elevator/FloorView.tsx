import PressableCard from '@/components/PressableCard';
import { getLifts, requestLift } from '@/services/api';
import {
  ElevatorScreenNavigationProps,
  ElevatorScreenRouteProps,
  Lift,
  LiftRequestDirection,
  LiftStatus,
} from '@/types/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuery, useMutation } from 'react-query';

type LiftIconProps = {
  status: LiftStatus;
};
function LiftIcon({ status }: LiftIconProps) {
  switch (status) {
    case LiftStatus.MOVING_UP:
      return <AntDesign name="arrowup" size={24} color="white" />;
    case LiftStatus.MOVING_DOWN:
      return <AntDesign name="arrowdown" size={24} color="white" />;
    case LiftStatus.IDLE:
    case LiftStatus.STAND_BY:
    default:
      return <FontAwesome6 name="arrow-right-arrow-left" size={24} color="white" />;
  }
}

type LiftItemProps = {
  lift: Lift;
  currentFloorNumber: number;
};
function LiftItem({ lift, currentFloorNumber }: LiftItemProps) {
  const canDoorBeOpened =
    lift.currentFloorNumber === currentFloorNumber &&
    (lift.status == LiftStatus.IDLE || lift.status == LiftStatus.STAND_BY);

  return (
    <View style={[styles.card, styles.elevatorItem]}>
      <Text>{lift.name}</Text>
      <View style={styles.divider} />
      <View style={styles.liftStatus}>
        <LiftIcon status={lift.status} />
        <Text style={styles.liftFloorText}>{lift.currentFloorNumber}</Text>
      </View>
    </View>
  );
}

export default function FloorView() {
  const navigation = useNavigation<ElevatorScreenNavigationProps>();
  const route = useRoute<ElevatorScreenRouteProps>();

  const { buildingId, buildingName, floorId, floorNumber } = route.params;

  const { data: lifts = [], isLoading: isLiftLoading } = useQuery(
    ['lifts', buildingId],
    () => getLifts(buildingId),
    {
      enabled: !!buildingId,
      refetchInterval: 1000,
    },
  );

  const { mutate } = useMutation({
    mutationFn: (direction: LiftRequestDirection) => requestLift(floorId, direction),
  });

  function gotoBuildingSelect() {
    navigation.navigate('Building');
  }

  function gotoFloorSelect() {
    navigation.navigate('Floor', { buildingId, buildingName });
  }

  if (isLiftLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContaier}>
        <Pressable style={[styles.card, styles.headerItem]} onPress={gotoBuildingSelect}>
          <Text style={styles.buildingHeader}>Building : {buildingName}</Text>
        </Pressable>
        <Pressable style={[styles.card, styles.headerItem]} onPress={gotoFloorSelect}>
          <Text style={styles.floorHeader}>Floor : {floorNumber}</Text>
        </Pressable>
      </View>
      <View style={styles.divider} />
      <Text style={styles.elevatorTitle}>Elevators</Text>
      <View style={styles.elevatorContainer}>
        {lifts.map((lift) => (
          <LiftItem lift={lift} currentFloorNumber={floorNumber} key={lift.id} />
        ))}
      </View>
      <View style={styles.divider} />
      <Text style={styles.elevatorTitle}>Elevator Request Buttons</Text>
      <View style={styles.floorButtonContainer}>
        <PressableCard onPress={() => mutate(LiftRequestDirection.UP)}>
          <AntDesign name="arrowup" size={40} color="black" />
        </PressableCard>
        <PressableCard onPress={() => mutate(LiftRequestDirection.DOWN)}>
          <AntDesign name="arrowdown" size={40} color="black" />
        </PressableCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  headerContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    margin: 5,
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
  headerItem: {
    flexGrow: 1,
  },
  buildingHeader: {
    fontSize: 20,
  },
  floorHeader: {
    fontSize: 20,
  },
  elevatorTitle: {
    fontSize: 20,
    margin: 5,
  },
  elevatorContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
    flexBasis: '25%',
  },
  elevatorItem: {
    flexBasis: '45%',
  },
  divider: {
    height: 1, // Thin divider
    backgroundColor: '#ccc', // Divider color
    marginVertical: 16, // Space around the divider
  },
  liftStatus: {
    backgroundColor: '#212121',
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    marginVertical: 1,
    padding: 10,
  },
  liftFloorText: {
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 10,
  },
  floorButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
