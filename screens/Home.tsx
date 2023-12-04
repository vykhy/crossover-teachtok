import React from 'react';
import useContent, {Content} from '../hooks/useContent';
import Post from '../components/Post';
import {FlatList, SafeAreaView} from 'react-native';

function Home() {
  const {content, isLoading, getNext} = useContent();
  const renderPost = ({item}: {item: Content}) => {
    return <Post post={item} />;
  };
  return (
    <SafeAreaView>
      <FlatList
        data={content}
        snapToAlignment="start"
        keyExtractor={(item, idx) => idx.toString()}
        pagingEnabled
        renderItem={renderPost}
        onEndReached={getNext}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
}

export default Home;
