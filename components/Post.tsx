import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import ActionsSidebar from './ActionsSidebar';
import PlaylistLink from './PlaylistLink';
import TopActions from './TopActions';
import Description from './Description';
import {Content, Option as OptionType} from '../hooks/useContent';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Option from './Option';

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
  const [answer, setAnswer] = useState<Answer>({answer: '', id: ''});

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

  const handleOption = (option: OptionType): void => {
    if (selectedId === '') setSelectedId(option.id);
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
            {post.options?.map((option: OptionType) => (
              <Option
                key={option.id}
                handleOption={handleOption}
                option={option}
                selectedId={selectedId}
                answer={answer}
              />
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
export type {Answer};

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
  bottomLeftContainer: {
    position: 'absolute',
    bottom: (height / 10) * 0.8,
    width: '100%',
  },
});
