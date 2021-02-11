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
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
    paddingLeft: 50,
  },
  addCardSubmitBtn: {
    position: 'absolute',
    height: 50,
    width: 40,
    left: 0,
    justifyContent: 'center',
  },
  addCardSubmitBtnText: {
    color: '#72A8BC',
    fontSize: 40,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});

export default AddCard;
