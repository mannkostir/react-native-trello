import * as types from '@/types/Common.types';
import {ColumnScreenNavigator} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {cardsActions} from '@/store/cards';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

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
    dispatch(cardsActions.getAllCards({token}));

    setIsEditing(false);
  };

  const checkCard = () => {
    if (!card.checked) {
      dispatch(
        cardsActions.updateCard({
          cardData: {...card, checked: true},
          cardId: card.id,
          column,
          token,
        }),
      );
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
        onValueChange={checkCard}
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
                <Text style={styles.editCardBtnText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardDeleteBtn}>
              <TouchableOpacity onPress={handleCardDelete}>
                <Text style={styles.cardDeleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text
          onPress={() =>
            navigation.navigate('CardDetails', {
              cardId: card.id,
              title: card.title,
            })
          }
          onLongPress={() => setIsEditing(true)}
          style={styles.cardText}>
          {card.title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    // padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCheckbox: {
    marginRight: 5,
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
