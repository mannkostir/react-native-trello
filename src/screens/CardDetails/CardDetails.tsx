import CardComments from '@/components/CardComments';
import CardMembers from '@/components/CardMembers';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import {CardDetailsRoute} from '@/types/Navigation.types';
import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const CardDetails = () => {
  const route = useRoute<CardDetailsRoute>();
  const {card, comments, token} = useSelector((state: RootState) => ({
    card: state.cards.currentCards.filter(
      (card) => card.id === route.params.cardId,
    )[0],
    comments: state.comments,
    token: state.auth.currentUser?.token || null,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getCard({cardId: card.id, token}));
  }, [comments]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.lastPrayed}>
        <Text>Last prayed</Text>
      </View>
      <View style={styles.infoTable}>
        <View style={styles.infoTableItem}>
          <Text>July whatever</Text>
          <Text>Date Added</Text>
          <Text>Opened for how long</Text>
        </View>
        <View style={styles.infoTableItem}>
          <Text>9001</Text>
          <Text>Times Prayed Total</Text>
        </View>
      </View>
      <View style={styles.infoTable}>
        <View style={styles.infoTableItem}>
          <Text>9000</Text>
          <Text>Times Prayed By Me</Text>
        </View>
        <View style={styles.infoTableItem}>
          <Text>1</Text>
          <Text>Times Prayed By Others</Text>
        </View>
      </View>
      <CardMembers members={[]} />
      <CardComments
        comments={comments.currentComments.filter((comment) =>
          card.commentsIds.includes(comment.id),
        )}
        cardId={card.id}
        dispatch={dispatch}
      />
    </View>
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
});

export default CardDetails;
