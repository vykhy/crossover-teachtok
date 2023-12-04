import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';

const {height} = Dimensions.get('screen');
const actionIcons: ImageSourcePropType[] = [
  require('./../public/assets/icons/HeartIcon.png'),
  require('./../public/assets/icons/CommentIcon.png'),
  require('./../public/assets/icons/SidebarIcon.png'),
  require('./../public/assets/icons/ShareIcon.png'),
];

import React from 'react';

function ActionsSidebar() {
  return (
    <View style={styles.bottomRightIconsContainer}>
      <Image
        source={require('./../public/assets/icons/PlusIcon.png')}
        style={{width: 55, height: 60, marginBottom: 20}}
      />
      {actionIcons.map((actionIcon: ImageSourcePropType, i: number) => (
        <Image
          source={actionIcon}
          key={i}
          style={{width: 50, height: 50, marginBottom: 20}}
        />
      ))}
    </View>
  );
}

export default ActionsSidebar;

const styles = StyleSheet.create({
  bottomRightIconsContainer: {
    position: 'absolute',
    bottom: (height / 10) * 0.6,
    right: 16,
    flexDirection: 'column',
    alignItems: 'center',
    width: '10%',
    zIndex: 2,
  },
});
