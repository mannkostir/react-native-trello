import {RootState} from '@/store';
import {commentActions} from '@/store/comments';
import commonStyles from '@/styles/commonStyles';
import React, {useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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

    Keyboard.dismiss();
  };
  return (
    <View style={{flex: 1}}>
      <MainTextInput
        multiline={true}
        style={commonStyles.textInput}
        placeholder="Add a comment..."
        onChangeText={(text) => setCommentBody(text)}
        onEndEditing={() => {
          setCommentBody('');
        }}
        value={commentBody}
        onSubmitEditing={handleAddComment}
        returnKeyType="done"
      />
    </View>
  );
};

export default AddComment;
