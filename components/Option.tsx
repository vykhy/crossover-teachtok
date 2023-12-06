import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Option as OptionType} from '../hooks/useContent';
import {Answer} from './Post';

type OptionPropTypes = {
  selectedId: string;
  answer: Answer;
  option: OptionType;
  handleOption: (option: OptionType) => void;
};

function Option({selectedId, answer, option, handleOption}: OptionPropTypes) {
  const isCorrectSelectedAnswer = (id: string): boolean => {
    return selectedId === id && id === answer?.id;
  };

  const isWrongSelectedAnswer = (id: string): boolean => {
    return id === selectedId && id !== answer?.id;
  };

  const isCorrectAnswer = (id: string): boolean => {
    return selectedId !== '' && id !== selectedId && id === answer?.id;
  };

  const getOptionStyle = (id: string): Record<string, any> => {
    if (isCorrectAnswer(id))
      return {...styles.optionStyle, ...styles.correctAnswer};
    if (isWrongSelectedAnswer(id))
      return {...styles.optionStyle, ...styles.wrongAnswer};
    if (isCorrectSelectedAnswer(id))
      return {...styles.optionStyle, ...styles.correctAnswer};
    return styles.optionStyle;
  };
  return (
    <TouchableOpacity
      disabled={selectedId !== ''}
      onPress={() => handleOption(option)}>
      <View style={StyleSheet.compose(getOptionStyle(option.id), {})}>
        <Text style={styles.optionText}>{option.answer}</Text>
        {isCorrectSelectedAnswer(option.id) && (
          <Image
            source={require('./../public/assets/icons/icons8-thumbs-up-50.png')}
            style={styles.correctIconStyle}
          />
        )}
        {isWrongSelectedAnswer(option.id) && (
          <Image
            source={require('./../public/assets/icons/icons8-thumbs-up-50.png')}
            style={styles.wrongIconStyle}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Option;

const styles = StyleSheet.create({
  optionStyle: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 15,
    padding: 15,
    color: 'black',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 1,
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
    width: '85%',
  },
  correctAnswer: {
    backgroundColor: '#28B18FB2',
  },
  wrongAnswer: {
    backgroundColor: '#DC5F5FB2',
  },
  correctIconStyle: {
    height: 30,
    width: 30,
  },
  wrongIconStyle: {
    height: 30,
    width: 30,
    transform: [{rotate: '180deg'}],
  },
});
