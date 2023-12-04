import React from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';

const {height} = Dimensions.get('screen');

type PlaylistLinkPropType = {
  playlist: string;
};
function PlaylistLink({playlist}: PlaylistLinkPropType) {
  return (
    <View style={styles.playlistContainer}>
      <Image
        source={require('./../public/assets/icons/PlaylistIcon.png')}
        style={{height: 20, width: 20}}
      />
      <Text style={styles.playlistText}>Playlist • Unit 5: {playlist}</Text>
    </View>
  );
}

export default PlaylistLink;

const styles = StyleSheet.create({
  playlistContainer: {
    backgroundColor: '#161616',
    height: 'auto',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  playlistText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    paddingLeft: 10,
  },
});
