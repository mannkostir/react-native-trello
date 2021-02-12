import {RootState} from '@/store';
import {commentActions} from '@/store/comments';
import commonStyles from '@/styles/common.styles';
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import MainTextInput from '../MainTextInput';

const AddComment = ({
  dispatch,
  cardId,
}: {
  dispatch: React.Dispatch<any>;
  cardId: number;
}) => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const [commentBody, setCommentBody] = useState('');

  const handleAddComment = () => {
    if (commentBody) {
      dispatch(
        commentActions.createComment({
          commentData: {
            body: commentBody,
            created: new Date().toDateString(),
          },
          token,
          cardId,
        }),
      );
    }

    setCommentBody('');
  };
  return (
    <View>
      <MainTextInput
        multiline={true}
        style={commonStyles.textInput}
        placeholder="Add a comment..."
        onChangeText={(text) => setCommentBody(text)}
        value={commentBody}
      />
      <Button onPress={handleAddComment} title="Add comment" />
    </View>
  );
};

export default AddComment;
