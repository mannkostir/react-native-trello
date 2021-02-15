import {RootState} from '@/store';
import {commentActions} from '@/store/comments';
import commonStyles from '@/styles/commonStyles';
import React, {useState} from 'react';
import {Button, KeyboardAvoidingView, View} from 'react-native';
import {useSelector} from 'react-redux';
import MainButton from '../MainButton';
import MainTextInput from '../MainTextInput';

const AddComment = ({
  dispatch,
  cardId,
}: {
  dispatch: React.Dispatch<any>;
  cardId: number;
}) => {
  const [commentBody, setCommentBody] = useState('');

  const handleAddComment = () => {
    if (commentBody) {
      dispatch(
        commentActions.createComment({
          commentData: {
            body: commentBody,
            created: new Date().toDateString(),
          },
          cardId,
        }),
      );
    }

    setCommentBody('');
  };
  return (
    <KeyboardAvoidingView>
      <MainTextInput
        multiline={true}
        style={commonStyles.textInput}
        placeholder="Add a comment..."
        onChangeText={(text) => setCommentBody(text)}
        value={commentBody}
      />
      <MainButton style={{marginTop: 7}} onPress={handleAddComment}>
        Add Comment
      </MainButton>
    </KeyboardAvoidingView>
  );
};

export default AddComment;
