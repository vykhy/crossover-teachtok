import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ActionsSidebar from './ActionsSidebar';
import PlaylistLink from './PlaylistLink';
import TopActions from './TopActions';
import Description from './Description';
import {Content, Option} from '../hooks/useContent';
import {useEffect, useState} from 'react';
import axios from 'axios';

const {height} = Dimensions.get('window');

type PostPropType = {
  post: Content;
};

type Answer = {
  answer: string;
  id: string;
};
function Post({post}: PostPropType) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [answer, setAnswer] = useState<Answer>();

  useEffect(() => {
    const controller = new AbortController();
    const getAnswer = async () => {
      const result = await axios.get(
        ` https://cross-platform.rp.devfactory.com/reveal?id=${post.id}`,
        {
          signal: controller.signal,
        },
      );
      setAnswer(result.data.correct_options[0]);
    };
    getAnswer();
    return () => {
      controller.abort();
    };
  }, []);

  const handleOption = (option: Option): void => {
    if (selectedId === '') setSelectedId(option.id);
  };

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
    <View style={styles.container}>
      <Image source={{uri: post.image}} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <TopActions />
      <View style={styles.translucentTextContainer}>
        <Text style={styles.translucentText}>{post.question}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftContainer}>
          <View style={styles.optionsContainer}>
            {post.options?.map((option: Option) => (
              <TouchableOpacity
                disabled={selectedId !== ''}
                onPress={() => handleOption(option)}
                key={option.id}>
                <View style={StyleSheet.compose(getOptionStyle(option.id), {})}>
                  <Text style={styles.optionText}>{option.answer}</Text>
                  {isCorrectSelectedAnswer(option.id) && (
                    <Image
                      source={require('./../public/assets/icons/icons8-thumbs-up-50.png')}
                      style={{
                        height: 40,
                        width: 40,
                      }}
                    />
                  )}
                  {isWrongSelectedAnswer(option.id) && (
                    <Image
                      source={require('./../public/assets/icons/icons8-thumbs-up-50.png')}
                      style={{
                        height: 40,
                        width: 40,
                        transform: [{rotate: '180deg'}],
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Description
            username={post.user.name}
            description={post.description}
          />
        </View>
        <ActionsSidebar />
      </View>
      <PlaylistLink playlist={post.playlist} />
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  backgroundImage: {
    height: height,
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  translucentTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '3%',
    borderRadius: 10,
    padding: 16,
    position: 'absolute',
    marginTop: (height / 6) * 1,
    width: '70%',
  },
  translucentText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 40,
    fontWeight: '400',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '3%',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: (height / 10) * 0.7,
    width: '80%',
  },
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
    // paddingVertical: 10,
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
  bottomLeftContainer: {
    position: 'absolute',
    bottom: (height / 10) * 0.8,
    width: '100%',
  },
});
