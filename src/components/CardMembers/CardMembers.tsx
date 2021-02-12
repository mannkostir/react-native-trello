import commonStyles from '@/styles/common.styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MainText from '../MainText';

const CardMembersItem = ({
  memberInfo,
}: {
  memberInfo: {name: string; id: number};
}) => {
  return <Text style={{marginRight: 10}}>{memberInfo.name}</Text>;
};

const CardMembers = ({members}: {members: {name: string; id: number}[]}) => {
  return (
    <View>
      <MainText style={commonStyles.sectionTitle}>Members</MainText>
      <FlatList
        style={styles.membersList}
        horizontal={true}
        data={members}
        renderItem={({item}) => <CardMembersItem memberInfo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  membersList: {
    flexDirection: 'row',
  },
});

export default CardMembers;
