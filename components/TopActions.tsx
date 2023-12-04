import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppStateContext} from '../contexts/AppStateContext';
import {formatDistance, formatDuration} from 'date-fns';

function TopActions() {
  const {totalTimeSpent} = useAppStateContext();
  return (
    <View style={styles.topIconsContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 50,
        }}>
        <Image
          source={require('./../public/assets/icons/ClockIcon.png')}
          style={{height: 25, width: 25}}
        />
        <Text style={{color: '#ccc', fontSize: 15}}> {totalTimeSpent}</Text>
      </View>
      <View style={{alignItems: 'center', width: 80}}>
        <Text style={styles.topIconText}>For You</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            height: 6,
            width: '70%',
            marginTop: 8,
          }}></View>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'flex-end', width: 50}}>
        <Image
          source={require('./../public/assets/icons/SearchIcon.png')}
          style={{height: 25, width: 25}}
        />
      </View>
    </View>
  );
}

export default TopActions;

const styles = StyleSheet.create({
  topIconsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  topIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
