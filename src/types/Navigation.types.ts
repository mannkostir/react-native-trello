import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from './Common.types';

export type MainNavigatorParamList = {
  Board: undefined;
  Column: {title: string; cards: Card[]};
  CardDetails: {cardInfo: Card};
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

export type ColumnScreenRoute = RouteProp<MainNavigatorParamList, 'Column'>;
export type CardDetailsRoute = RouteProp<MainNavigatorParamList, 'CardDetails'>;
