import {Pressable, Text, View} from 'react-native';

export const RightActions = ({
  handleEditPress,
  handleDeletePress,
}: {
  handleEditPress: () => void;
  handleDeletePress: () => void;
}) => {
  return (
    <View
      style={{
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <Pressable
        onPress={handleEditPress}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: '#72A8BC',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>Edit</Text>
      </Pressable>
      <Pressable
        onPress={handleDeletePress}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: '#AC5253',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>Delete</Text>
      </Pressable>
    </View>
  );
};
