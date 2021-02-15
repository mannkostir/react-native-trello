import {commentActions} from '@/store/comments';
import commonStyles from '@/styles/commonStyles';
import {Comment, User} from '@/types/commonTypes';
import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AddComment from '../AddComment/AddComment';
import MainText from '../MainText';
import MainTextInput from '../MainTextInput';

function getDuration(ms: number): string {
  let minutes = Math.floor(ms / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);

  if (days) {
    return `${days} days ago`;
  } else {
    return `today`;
  }
}

const CardCommentsItem = ({
  comment,
  user,
  dispatch,
}: {
  comment: Comment;
  user: User | null;
  dispatch: React.Dispatch<any>;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState('');

  const handleCommentDelete = () => {
    dispatch(
      commentActions.deleteComment({
        commentId: comment.id,
      }),
    );
  };
  const handleCommentEdit = () => {
    dispatch(
      commentActions.updateComment({
        commentData: {...comment, body: newCommentBody},
        commentId: comment.id,
      }),
    );

    setIsEditMode(false);
  };
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <MainText style={styles.commentAuthor}>
          {user?.name || 'Unknown'}
        </MainText>
        <MainText style={styles.commentDate}>
          {getDuration(Date.now() - Date.parse(comment.created))}
        </MainText>
      </View>
      {isEditMode ? (
        <View>
          <MainTextInput
            style={[
              commonStyles.textInput,
              {borderWidth: 1, borderColor: '#E5E5E5'},
            ]}
            onChangeText={(text) => setNewCommentBody(text)}
          />
          <TouchableOpacity onPress={handleCommentEdit}>
            <MainText style={{color: '#72A8BC'}}>Edit</MainText>
          </TouchableOpacity>
        </View>
      ) : (
        <MainText onLongPress={() => setIsEditMode(true)}>
          {comment.body}
        </MainText>
      )}
      {comment.userId === user?.id ? (
        <View style={styles.commentDeleteBtn}>
          <TouchableOpacity onPress={handleCommentDelete}>
            <MainText style={styles.commentDeleteBtnText}>Delete</MainText>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const CardComments = ({
  comments,
  cardId,
  currentUser,
  dispatch,
}: {
  comments: Comment[];
  cardId: number;
  currentUser: User | null;
  dispatch: React.Dispatch<any>;
}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={commonStyles.sectionTitle}>Comments</Text>
      <FlatList
        data={comments}
        style={styles.commentsList}
        renderItem={({item}) => (
          <CardCommentsItem
            dispatch={dispatch}
            user={currentUser}
            comment={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddComment cardId={cardId} dispatch={dispatch} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
  comment: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  commentAuthor: {
    fontWeight: '700',
    marginBottom: 5,
  },
  commentHeader: {
    flexDirection: 'row',
  },
  commentDate: {
    marginLeft: 10,
  },
  commentDeleteBtn: {
    position: 'absolute',
    right: 20,
    top: 5,
  },
  commentDeleteBtnText: {
    color: '#AC5253',
  },
});

export default CardComments;
