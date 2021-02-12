import * as types from '@/types/Common.types';
import {ColumnScreenNavigator} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {cardsActions} from '@/store/cards';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import MainText from '../MainText';

const Card = ({
  card,
  dispatch,
}: {
  card: types.Card;
  dispatch: React.Dispatch<any>;
}) => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );
  const column = useSelector(
    (state: RootState) =>
      state.columns.currentColumns.find(
        (column) => column.id === card.columnId,
      ) || null,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const navigation = useNavigation<ColumnScreenNavigator>();
  const [isChecked, setIsChecked] = useState(card.checked);

  const handleCardTitleChange = () => {
    if (newTitle && column) {
      dispatch(
        cardsActions.updateCard({
          cardData: {
            checked: card.checked,
            description: card.description,
            title: newTitle,
          },
          cardId: card.id,
          token,
          column,
        }),
      );
    }

    setIsEditing(false);
  };

  const handleCardDelete = () => {
    dispatch(
      cardsActions.deleteCard({
        cardId: card.id,
        token,
      }),
    );
  };

  const toggleCheckCard = () => {
    // Wait for animation to finish first (for ios)
    const timeoutDuration = Platform.OS === 'ios' ? 500 : 0;
    if (card) {
      setTimeout(() => {
        dispatch(
          cardsActions.updateCard({
            cardData: {...card, checked: !card.checked},
            cardId: card.id,
            column,
            token,
          }),
        );
      }, timeoutDuration);
    }
  };
  return (
    <View
      style={{
        ...styles.card,
        ...(isEditing ? {paddingVertical: 0} : {paddingVertical: 10}),
      }}>
      <CheckBox
        value={card.checked}
        onValueChange={toggleCheckCard}
        style={styles.cardCheckbox}
      />
      {isEditing ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <TextInput
            placeholder={card.title}
            onChangeText={(text) => setNewTitle(text)}
          />
          <View style={styles.buttonsWrapper}>
            <View style={styles.editCardBtn}>
              <TouchableOpacity onPress={handleCardTitleChange}>
                <MainText style={styles.editCardBtnText}>Edit</MainText>
              </TouchableOpacity>
            </View>
            <View style={styles.cardDeleteBtn}>
              <TouchableOpacity onPress={handleCardDelete}>
                <MainText style={styles.cardDeleteBtnText}>Delete</MainText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <MainText
          numberOfLines={1}
          onPress={() =>
            navigation.navigate('CardDetails', {
              cardId: card.id,
              title: card.title,
            })
          }
          onLongPress={() => setIsEditing(true)}
          style={styles.cardText}>
          {card.title}
        </MainText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCheckbox: {
    marginRight: 20,
  },
  cardText: {
    flex: 1,
  },
  buttonsWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 20,
    flexDirection: 'row',
  },
  cardDeleteBtn: {
    backgroundColor: '#AC5253',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cardDeleteBtnText: {
    color: '#ffffff',
  },
  editCardBtn: {
    backgroundColor: '#72A8BC',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  editCardBtnText: {
    color: '#ffffff',
  },
});

export default Card;
