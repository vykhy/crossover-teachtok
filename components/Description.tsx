import {StyleSheet, Text, View} from 'react-native';

type DescriptionPropType = {
  username: string;
  description: string;
};

function Description({username, description}: DescriptionPropType) {
  return (
    <View>
      <Text style={styles.userName}>{username}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default Description;

const styles = StyleSheet.create({
  userName: {fontSize: 16, fontWeight: '600', color: 'white'},
  description: {color: 'white', fontSize: 14},
});
