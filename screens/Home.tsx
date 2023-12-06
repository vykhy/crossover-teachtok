import React from 'react';
import useContent, {Content} from '../hooks/useContent';
import Post from '../components/Post';
import {FlatList, RefreshControl, Text} from 'react-native';
import {SafeAreaView} from 'react-native';

function Home() {
  const {content, isLoading, getNext} = useContent();
  const renderPost = ({item}: {item: Content}) => {
    return <Post post={item} />;
  };
  return (
    <SafeAreaView>
      {content.length == 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={content}
          snapToAlignment="start"
          keyExtractor={(item, idx) => idx.toString()}
          pagingEnabled
          renderItem={renderPost}
          onEndReached={getNext}
          onEndReachedThreshold={1}
          contentContainerStyle={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={isLoading && content.length < 1} />
          }
        />
      )}
    </SafeAreaView>
  );
}

export default Home;
