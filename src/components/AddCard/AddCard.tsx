import {cardsActions} from '@/store/cards';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MainTextInput from '../MainTextInput';

const AddCard = ({
  columnId,
  dispatch,
}: {
  columnId: number;
  dispatch: React.Dispatch<any>;
}) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = () => {
    if (newCardTitle) {
      dispatch(
        cardsActions.createCard({
          cardData: {title: newCardTitle, description: '', checked: false},
          columnId,
        }),
      );
    }
    setNewCardTitle('');
  };
  return (
    <View style={styles.addCardWrapper}>
      <MainTextInput
        style={styles.addCardInput}
        placeholder={'Add a prayer...'}
        onChangeText={(text) => setNewCardTitle(text)}
        value={newCardTitle}
        selectionColor="#72A8BC"
      />
      <View style={styles.addCardSubmitBtn}>
        <TouchableOpacity onPress={handleAddCard}>
          <Text style={styles.addCardSubmitBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addCardWrapper: {
    position: 'relative',
  },
  addCardInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginBottom: 25,
    height: 50,
    paddingLeft: 50,
  },
  addCardSubmitBtn: {
    position: 'absolute',
    height: 50,
    width: 40,
    left: 5,
    top: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  addCardSubmitBtnText: {
    color: '#72A8BC',
    fontSize: 36,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});

export default AddCard;
