import {commentActions} from '@/store/comments';
import commonStyles from '@/styles/common.styles';
import {Comment, User} from '@/types/Common.types';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AddComment from '../AddComment/AddComment';

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
  const handleCommentDelete = () => {
    dispatch(
      commentActions.deleteComment({
        commentId: comment.id,
        token: user?.token || null,
      }),
    );
  };
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>Author</Text>
        <Text style={styles.commentDate}>
          {getDuration(Date.now() - Date.parse(comment.created))}
        </Text>
      </View>
      <Text>{comment.body}</Text>
      {comment.userId === user?.id ? (
        <View style={styles.commentDeleteBtn}>
          <TouchableOpacity onPress={handleCommentDelete}>
            <Text style={styles.commentDeleteBtnText}>Delete</Text>
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
    <ScrollView>
      <Text style={commonStyles.sectionTitle}>Comments</Text>
      <FlatList
        data={comments}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  comment: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
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
