import {cardsActions} from '@/store/cards/cardsSlice';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const AddCard = () => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const dispatch = useDispatch();

  const handleAddCard = () => {};
  return (
    <View style={styles.addCardWrapper}>
      <TextInput
        style={styles.addCardInput}
        placeholder={'Add a prayer...'}
        onChangeText={(text) => setNewCardTitle(text)}
      />
      <TouchableOpacity style={styles.addCardSubmitBtn}>
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
