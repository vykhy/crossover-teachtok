import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppStateContext} from '../contexts/AppStateContext';

function TopActions() {
  const {totalTimeSpent} = useAppStateContext();
  return (
    <View style={styles.topIconsContainer}>
      <View style={styles.timeContainer}>
        <Image
          source={require('./../public/assets/icons/ClockIcon.png')}
          style={styles.timeIcon}
        />
        <Text style={styles.time}> {totalTimeSpent}</Text>
      </View>
      <View style={styles.forYou}>
        <Text style={styles.topIconText}>For You</Text>
        <View style={styles.forYouUnderline}></View>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'flex-end', width: 50}}>
        <Image
          source={require('./../public/assets/icons/SearchIcon.png')}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
}

export default TopActions;

const styles = StyleSheet.create({
  topIconsContainer: {
    marginTop: 25,
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
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  timeIcon: {height: 25, width: 25},
  time: {color: '#ccc', fontSize: 15},
  forYou: {alignItems: 'center', width: 80},
  forYouUnderline: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 6,
    width: '70%',
    marginTop: 8,
  },
  searchIcon: {height: 25, width: 25},
});
