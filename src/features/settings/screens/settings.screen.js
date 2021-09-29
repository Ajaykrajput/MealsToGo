import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { SafeArea } from "../../../componants/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Text } from "../../../componants/typography/text.component";
import { Spacer } from "../../../componants/spacer/spacer.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../../infrastructure/theme/colors";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.3);
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  //   useFocusEffect(() => {
  //     getProfilePicture(user);
  //   }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );
  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo && (
              <Avatar.Icon
                size={180}
                icon="human"
                backgroundColor={colors.brand.primary}
              />
            )}
            {photo && (
              <Avatar.Image
                size={180}
                source={{ uri: photo }}
                backgroundColor="#2182BD"
              />
            )}
          </TouchableOpacity>
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon="heart" />
            )}
            onPress={() => navigation.navigate("Favourites")}
          />
          <Spacer />
          <SettingsItem
            title="Payment"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
            )}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            title="Past Orders"
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.ui.secondary}
                icon="history"
              />
            )}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            title="Logout"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="door" />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
