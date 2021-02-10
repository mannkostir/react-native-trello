import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {Card, Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const ListItem = ({
  title,
  id,
  navigation,
  dispatch,
}: {
  title: string;
  id: number;
  navigation: BoardScreenNavigation;
  dispatch: React.Dispatch<any>;
}) => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleColumnTitleChange = () => {
    if (newTitle) {
      dispatch(
        columnsActions.updateColumn({
          columnData: {title: newTitle},
          listId: id,
          token,
        }),
      );
    }
    setIsEditing(false);
  };
  return (
    <View style={styles.column}>
      {isEditing ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            placeholder={title}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TouchableOpacity onPress={handleColumnTitleChange}>
            <Text style={{marginLeft: 15}}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={styles.columnText}
          onPress={() =>
            navigation.navigate('Column', {
              title,
              columnId: id,
            })
          }
          onLongPress={() => setIsEditing(true)}>
          {title}
        </Text>
      )}
    </View>
  );
};

interface IListsProps {
  lists: Column[];
  navigation: BoardScreenNavigation;
  dispatch: React.Dispatch<any>;
}

const Columns = ({lists, navigation, dispatch}: IListsProps) => {
  return (
    <SafeAreaView>
      <FlatList
        data={lists}
        renderItem={({item}) => (
          <ListItem
            dispatch={dispatch}
            navigation={navigation}
            title={item.title}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    fontSize: 17,
    marginBottom: 7,
  },
  columnText: {
    fontWeight: '700',
  },
});

export default Columns;
