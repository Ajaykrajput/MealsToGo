// import React from "react";
// import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
// import { Searchbar } from "react-native-paper";
// import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

// export const RestaurentsScreen = () => (
//   <SafeAreaView style={styles.container}>
//     <View style={styles.search}>
//       <Searchbar />
//     </View>
//     <View style={styles.list}>
//       <RestaurantInfoCard />
//     </View>
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight,
//   },
//   search: {
//     padding: 16,
//   },
//   list: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "blue",
//   },
// });

import React, { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { SafeArea } from "../../componants/utility/safe-area.component";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../componants/spacer/spacer.component";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const RestaurantsScreen = () => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  //   console.log(restaurantContext);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          //   console.log(item);
          return (
            <Spacer position="bottom">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
