import CardComments from '@/components/CardComments';
import CardMembers from '@/components/CardMembers';
import MainText from '@/components/MainText';
import {RootState} from '@/store';
import {useAuthSelector} from '@/store/auth';
import {cardsActions, useCardsSelector} from '@/store/cards';
import {commentActions, useCommentsSelector} from '@/store/comments';
import {CardDetailsRoute} from '@/types/navigationTypes';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const cardMembers = [
  {name: 'MemberOne', id: 1},
  {name: 'MemberTwo', id: 2},
  {name: 'MemberThree', id: 3},
];

const CardDetails = () => {
  const route = useRoute<CardDetailsRoute>();

  const {selectedCard, getCard} = useCardsSelector();
  const {comments} = useCommentsSelector();
  const {currentUser} = useAuthSelector();

  const card = selectedCard || getCard(route.params.cardId);

  const scrollView = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentActions.getAllComments());
  }, []);

  useEffect(() => {
    if (!card) return;
    dispatch(
      cardsActions.getCard({
        cardId: card.id,
      }),
    );
  }, [comments]);

  return card ? (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={150}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{flex: 1, paddingHorizontal: 20}}>
          <View style={styles.lastPrayed}>
            <MainText>Last prayed a while ago</MainText>
          </View>
          <View style={styles.infoTable}>
            <View style={styles.infoTableItem}>
              <MainText style={styles.infoItemTitle}>February 30 2017</MainText>
              <MainText style={styles.infoItemText}>Date Added</MainText>
              <MainText style={[styles.infoItemText, {color: 'blue'}]}>
                Opened for several days
              </MainText>
            </View>
            <View style={styles.infoTableItem}>
              <MainText style={styles.infoItemTitle}>9001</MainText>
              <MainText style={styles.infoItemText}>
                Times Prayed Total
              </MainText>
            </View>
          </View>
          <View style={styles.infoTable}>
            <View style={styles.infoTableItem}>
              <MainText style={styles.infoItemTitle}>9000</MainText>
              <MainText style={styles.infoItemText}>
                Times Prayed By Me
              </MainText>
            </View>
            <View style={styles.infoTableItem}>
              <MainText style={styles.infoItemTitle}>1</MainText>
              <MainText style={styles.infoItemText}>
                Times Prayed By Others
              </MainText>
            </View>
          </View>
          <CardMembers members={cardMembers} />
          <CardComments
            comments={comments.filter((comment) =>
              card.commentsIds.includes(comment.id),
            )}
            cardId={card.id}
            currentUser={currentUser || null}
            dispatch={dispatch}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  ) : null;
};

const styles = StyleSheet.create({
  lastPrayed: {
    flex: 0,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  infoTable: {
    flex: 1,
    flexDirection: 'row',
  },
  infoTableItem: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    padding: 15,
    justifyContent: 'center',
  },
  infoItemTitle: {
    fontSize: 18,
    color: '#BFB393',
    marginBottom: 5,
  },
  infoItemText: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default CardDetails;
