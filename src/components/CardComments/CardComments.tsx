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

const CardComments = ({
  comments,
  cardId,
  dispatch,
}: {
  comments: Comment[];
  cardId: number;
  dispatch: React.Dispatch<any>;
}) => {
  return (
    <View>
      <Text>Comments</Text>
      <FlatList
        data={comments}
        renderItem={({item}) => <CardCommentsItem comment={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddComment cardId={cardId} dispatch={dispatch} />
    </View>
  );
};

export default CardComments;
