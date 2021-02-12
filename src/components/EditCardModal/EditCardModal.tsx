import {Card} from '@/types/Common.types';
import React, {useState} from 'react';
import {Modal, ModalProps, Pressable, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import MainText from '../MainText';
import MainTextInput from '../MainTextInput';

const EditCardModal = ({
  card,
  onSubmit,
  onDiscard,
  ...props
}: ModalProps & {
  card: Card;
  onSubmit: (newTitle: string) => void;
  onDiscard: () => void;
}) => {
  const [newTitle, setNewTitle] = useState('');

  const handleSave = () => {
    onSubmit(newTitle);
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <Modal {...props} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            width: '70%',
            minHeight: 200,
            alignSelf: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}>
          <MainText>Enter new card title:</MainText>
          <MainTextInput
            numberOfLines={3}
            multiline={true}
            style={{
              borderColor: '#E5E5E5',
              borderWidth: 1,
              borderRadius: 10,
              width: '100%',
            }}
            placeholder={card.title}
            onChangeText={(text) => setNewTitle(text)}
            selectTextOnFocus={true}
            defaultValue={card.title}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity style={{marginRight: 30}} onPress={handleDiscard}>
              <Text style={{color: '#AC5253'}}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{color: '#72A8BC'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCardModal;
