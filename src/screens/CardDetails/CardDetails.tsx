import CardComments from '@/components/CardComments';
import CardMembers from '@/components/CardMembers';
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
    card: state.cards.currentCards.filter(
      (card) => card.id === route.params.cardId,
    )[0],
    comments: state.comments,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      commentActions.getAllComments({token: auth.currentUser?.token || null}),
    );

    return () => {
      dispatch(
        cardsActions.getAllCards({token: auth.currentUser?.token || null}),
      );
    };
  }, []);

  useEffect(() => {
    dispatch(
      cardsActions.getCard({
        cardId: card.id,
        token: auth.currentUser?.token || null,
      }),
    );
  }, [comments]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.lastPrayed}>
        <Text>Last prayed a while ago</Text>
      </View>
      <View style={styles.infoTable}>
        <View style={styles.infoTableItem}>
          <Text style={styles.infoItemTitle}>February 30 2017</Text>
          <Text>Date Added</Text>
          <Text>Opened for several days</Text>
        </View>
        <View style={styles.infoTableItem}>
          <Text style={styles.infoItemTitle}>9001</Text>
          <Text>Times Prayed Total</Text>
        </View>
      </View>
      <View style={styles.infoTable}>
        <View style={styles.infoTableItem}>
          <Text style={styles.infoItemTitle}>9000</Text>
          <Text>Times Prayed By Me</Text>
        </View>
        <View style={styles.infoTableItem}>
          <Text style={styles.infoItemTitle}>1</Text>
          <Text>Times Prayed By Others</Text>
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
  );
};

const styles = StyleSheet.create({
  lastPrayed: {
    paddingVertical: 20,
    paddingLeft: 40,
  },
  infoTable: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  infoTableItem: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    padding: 10,
    justifyContent: 'center',
  },
  infoItemTitle: {
    fontSize: 24,
    color: '#BFB393',
  },
});

export default CardDetails;
