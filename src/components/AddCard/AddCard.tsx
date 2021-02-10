import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const AddCard = ({
  columnId,
  dispatch,
}: {
  columnId: number;
  dispatch: React.Dispatch<any>;
}) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const auth = useSelector((state: RootState) => state.auth);

  const handleAddCard = () => {
    if (newCardTitle) {
      dispatch(
        cardsActions.createCard({
          cardData: {title: newCardTitle, description: '', checked: false},
          token: auth.currentUser?.token || null,
          columnId,
        }),
      );
    }
  };
  return (
    <View style={styles.addCardWrapper}>
      <TextInput
        style={styles.addCardInput}
        placeholder={'Add a prayer...'}
        onChangeText={(text) => setNewCardTitle(text)}
      />
      <TouchableOpacity style={styles.addCardSubmitBtn} onPress={handleAddCard}>
        <Text style={styles.addCardSubmitBtnText}>+</Text>
      </TouchableOpacity>
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
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 20,
  },
  addCardSubmitBtn: {
    alignSelf: 'center',
  },
  addCardSubmitBtnText: {
    color: '#72A8BC',
    fontSize: 40,
  },
});

export default AddCard;
