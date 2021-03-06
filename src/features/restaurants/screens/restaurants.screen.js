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

import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
// import { ActivityIndicator, Colors } from "react-native-paper";
import { FadeInView } from "../../../componants/animations/fade.animation";

import { SafeArea } from "../../../componants/utility/safe-area.component";
import { Search } from "../components/search.component";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../componants/spacer/spacer.component";
import { FavouritesBar } from "../../../componants/favourites/favourites-bar.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import LottieView from "lottie-react-native";

// const Loading = styled(ActivityIndicator)`
//   margin-left: -25px;
// `;
const LoadingContainer = styled.View`
  width: 100%;
  height: 50%;
  position: absolute;
  top: 40px;
  padding: ${(props) => props.theme.space[2]};
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  // console.log(restaurantContext);
  //   console.log(navigation);
  return (
    <>
      {isLoading && (
        <LoadingContainer size={100}>
          {/* <Loading size={50} animating={true} color={Colors.blue300} /> */}
          <LottieView
            key="animation"
            autoPlay
            loop
            // resizeMode="cover"
            source={require("../../../../assets/meals-animation.json")}
          />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          //   console.log(item);
          return (
            <TouchableOpacity
              //   onPress={() => navigation.navigate("RestaurantDetail")}
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};

// export default RestaurantsScreen;
