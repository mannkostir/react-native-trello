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
  return (
    <View style={styles.card}>
      <CheckBox
        value={isChecked}
        onValueChange={(isChecked) => setIsChecked(isChecked)}
        style={styles.cardCheckbox}
      />
      {isEditing ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            placeholder={card.title}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TouchableOpacity onPress={handleCardTitleChange}>
            <Text>Edit</Text>
          </TouchableOpacity>
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
    padding: 15,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCheckbox: {
    marginRight: 5,
  },
  cardText: {
    flex: 1,
  },
});

export default Card;
