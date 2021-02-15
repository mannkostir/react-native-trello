import {Column} from '@/types/commonTypes';
import React, {useState} from 'react';
import {Modal, ModalProps, Pressable, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import MainButton from '../MainButton';
import MainText from '../MainText';
import MainTextInput from '../MainTextInput';

const EditColumnModal = ({
  column,
  onSubmit,
  onDiscard,
  ...props
}: ModalProps & {
  column: Column | null;
  onSubmit: (data: {newTitle: string; column: Column | null}) => void;
  onDiscard: () => void;
}) => {
  const [newTitle, setNewTitle] = useState('');

  const handleSave = () => {
    onSubmit({newTitle, column});
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <Modal {...props} transparent={true} animationType="slide">
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
          <MainText>Enter new column title:</MainText>
          <MainTextInput
            numberOfLines={3}
            multiline={true}
            style={{
              borderColor: '#E5E5E5',
              borderWidth: 1,
              borderRadius: 10,
              width: '100%',
              maxHeight: 40,
            }}
            placeholder={column?.title}
            onChangeText={(text) => setNewTitle(text)}
            selectTextOnFocus={true}
            defaultValue={column?.title}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity style={{marginRight: 30}} onPress={handleDiscard}>
              <Text style={{color: '#AC5253'}}>Discard</Text>
            </TouchableOpacity>
            <MainButton onPress={handleSave}>Save</MainButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditColumnModal;
