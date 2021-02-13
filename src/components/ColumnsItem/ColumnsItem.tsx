import {RootState} from '@/store';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import MainText from '../MainText';

const ColumnsItem = ({
  title,
  id,
  navigation,
  enableColumnEditMode,
  deleteColumn,
}: {
  title: string;
  id: number;
  navigation: BoardScreenNavigation;
  enableColumnEditMode: () => void;
  deleteColumn: () => void;
}) => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  return (
    <View style={styles.column}>
      <>
        <MainText
          weight="Medium"
          onPress={() =>
            navigation.navigate('Column', {
              title,
              columnId: id,
            })
          }>
          {title}
        </MainText>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            top: 5,
            right: 10,
          }}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={enableColumnEditMode}>
            <Text style={{color: '#72A8BC'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: '#AC5253'}} onPress={deleteColumn}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 17,
    marginBottom: 10,
  },
});

export default ColumnsItem;
