import {Comment} from '@/types/Common.types';
import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AddComment from '../AddComment/AddComment';

const CardCommentsItem = ({comment}: {comment: Comment}) => {
  return (
    <View>
      <Text>{comment.body}</Text>
    </View>
  );
};

const CardComments = ({comments}: {comments: Comment[]}) => {
  return (
    <View>
      <Text>Comments</Text>
      <FlatList
        data={comments}
        renderItem={({item}) => <CardCommentsItem comment={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddComment />
    </View>
  );
};

export default CardComments;
