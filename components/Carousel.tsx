import { FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { styled } from 'styled-components/native';

import { categories } from '../utils/categories';
import { RouterProps } from '../pages/Home';
import { useAppDispatch } from '../redux/store';
import { setCategoryId } from '../redux/slices/quizSlice';

export const Carousel = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();

  const handlerCategoryClick = (id: number | string) => {
    navigation.navigate('DifficultyMenu');
    dispatch(setCategoryId(id));
  };
  const renderItem = ({ item }: any) => (
    <CardImg key={item.name}>
      <TouchableOpacity onPress={() => handlerCategoryClick(item.id)}>
        <Title>{item.name}</Title>
        <CardImage source={{ uri: item.url }} />
      </TouchableOpacity>
    </CardImg>
  );

  return (
    <Container>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CardImg = styled.View`
  flex: 1;
  width: 180px;
  height: 180px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  overflow: hidden;
  padding-left: 2px;
  padding-right: 2px;
  background-color: #cce3de;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;
