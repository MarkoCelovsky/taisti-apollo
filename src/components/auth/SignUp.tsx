import { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import { t } from "i18next";

import { CustomButton, CustomText } from "components/UI/CustomElements";
import { stylesAuthForms } from "styles/main";

interface Props {
    signUpHandler: () => void;
    promptAsync: () => void;
    signInWithApple: () => void;
    request: Google.GoogleAuthRequestConfig | null;
}

export const SignUp = ({
    signUpHandler,
    promptAsync,
    signInWithApple,
    request,
}: Props): ReactElement => {
    return (
        <>
            <View style={stylesAuthForms.btn}>
                <CustomButton onPress={signUpHandler} status="info">
                    {t("Sign up").toString()}
                </CustomButton>
            </View>
            <CustomText style={styles.orSeparator}>{t("OR")}</CustomText>
            <View style={stylesAuthForms.btn}>
                <FontAwesome.Button
                    name="google"
                    backgroundColor="#eee"
                    color="#000000"
                    borderRadius={10}
                    style={styles.googleButton}
                    disabled={!request}
                    onPress={() => promptAsync()}
                >
                    {t("Sign up with Google")}
                </FontAwesome.Button>
            </View>
            {Platform.OS === "ios" ? (
                <View style={stylesAuthForms.btn}>
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                        cornerRadius={5}
                        onPress={signInWithApple}
                    />
                </View>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    googleButton: {
        padding: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 48,
        fontSize: 16,
    },
    orSeparator: { color: "#838895", textAlign: "center", marginTop: 16 },
});
