import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from './commonTypes';

export type MainNavigatorParamList = {
  Board: {isAddingColumn: boolean};
  Column: {title: string; columnId: number};
  CardDetails: {cardId: number; title: string};
  Auth: undefined;
};

export type ColumnNavigatorParamList = {
  cards: Card[];
  subscribed: Card[];
};

export type BoardScreenNavigation = StackNavigationProp<
  MainNavigatorParamList,
  'Board'
>;
export type ColumnScreenNavigator = StackNavigationProp<
  MainNavigatorParamList,
  'Column'
>;

export type BoardScreenRoute = RouteProp<MainNavigatorParamList, 'Board'>;
export type ColumnScreenRoute = RouteProp<MainNavigatorParamList, 'Column'>;
export type CardDetailsRoute = RouteProp<MainNavigatorParamList, 'CardDetails'>;
