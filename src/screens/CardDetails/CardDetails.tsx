import CardComments from '@/components/CardComments';
import CardMembers from '@/components/CardMembers';
import MainText from '@/components/MainText';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import {commentActions} from '@/store/comments';
import {CardDetailsRoute} from '@/types/Navigation.types';
import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const cardMembers = [
  {name: 'MemberOne', id: 1},
  {name: 'MemberTwo', id: 2},
  {name: 'MemberThree', id: 3},
];

const CardDetails = () => {
  const route = useRoute<CardDetailsRoute>();

  const {card, comments, auth} = useSelector((state: RootState) => ({
    card:
      state.cards.selectedCard ||
      state.cards.currentCards.find(
        (card) => card.id === route.params.cardId,
      ) ||
      null,
    comments: state.comments,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      commentActions.getAllComments({token: auth.currentUser?.token || null}),
    );
  }, []);

  useEffect(() => {
    if (!card) return;
    dispatch(
      cardsActions.getCard({
        cardId: card.id,
        token: auth.currentUser?.token || null,
      }),
    );
  }, [comments]);

  return card ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{paddingBottom: 30}}
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
          <MainText style={styles.infoItemText}>Times Prayed Total</MainText>
        </View>
      </View>
      <View style={styles.infoTable}>
        <View style={styles.infoTableItem}>
          <MainText style={styles.infoItemTitle}>9000</MainText>
          <MainText style={styles.infoItemText}>Times Prayed By Me</MainText>
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
        comments={comments.currentComments.filter((comment) =>
          card.commentsIds.includes(comment.id),
        )}
        cardId={card.id}
        currentUser={auth.currentUser || null}
        dispatch={dispatch}
      />
    </ScrollView>
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
