import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from "react-native";

import { images, COLORS, SIZES, FONTS } from "../constants";

import userData from "../data/userData";
import { AuthContext } from '../components/context';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import Button from 'react-native-button';

export default function Login({ navigation }) {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data;
    const [users, setUsers] = useState(userData);

    const [error, setError] = useState('');
    const [key, setKey] = useState();

    const { login } = React.useContext(AuthContext);

    function handleOnChangeText(value, fieldName) {
        setData({ ...data, [fieldName]: value });
    }

    function isValidObject(obj) {
        return Object.values(obj).some(value => value.trim());
    }

    function isValidEmail(email) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }

    function checkUser(email, password) {
        const foundUser = users.filter(item => {
            return email == item.email && password == item.password;
        });

        return foundUser;
    }

    function isValidInfo() {
        if (!isValidObject(data))
            return setError('All field must be required');
        if (!email.trim().length > 0)
            return setError('Email field must be required');
        if (!isValidEmail(email))
            return setError('Email isn\'t valid');
        if (!password.trim() || password.length < 8)
            return setError('Password must be at least 8 characters');
        if (checkUser(email, password).length == 0)
            return setError('Email or password incorrect');

        return true;
    }

    const submitInfo = () => {
        if (isValidInfo()) {
            login(checkUser(email, password));
        }
    }

    return (
        // SignIn View
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Brand View */}
            <ImageBackground
                source={images.background}
                style={{ height: SIZES.height / 2.5 }}
            >
                <View style={styles.brandView}>
                    <Animatable.Image
                        animation="bounce"
                        duration={3000}
                        source={images.logo}
                        style={{
                            height: SIZES.height / 5,
                            width: SIZES.width / 2.5,
                        }}
                    />
                </View>
            </ImageBackground>

            {/* Bottom View */}
            <View style={styles.bottomView}>
                {/* Welcome View */}
                <View style={{ padding: 40 }}>
                    <Text style={styles.bottomTitle}>
                        Welcome to JAV App
                    </Text>
                    <Text style={{ fontSize: SIZES.h5, color: COLORS.black }}>
                        Dont't have an account?
                        <Text style={{ color: COLORS.primary, fontStyle: 'italic', }}>
                            {' '}
                            Register now
                        </Text>
                    </Text>
                    {/* Form Inputs View */}
                    <View style={styles.formInputFirst}>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color={COLORS.primary}
                                size={SIZES.h3}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                value={email}
                                placeholder="Enter your email"
                                style={styles.textInput}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(value) => handleOnChangeText(value, 'email')}
                            />
                            {/* <FontAwesome
                                name="check"
                                color={COLORS.primary}
                                size={SIZES.h2}
                                style={{ marginTop: 13 }}
                            /> */}
                        </View>
                    </View>
                    <View style={styles.formInput}>
                        <View style={styles.action}>
                            <FontAwesome
                                name="lock"
                                color={COLORS.primary}
                                size={SIZES.h3}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Enter your Password"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(value) => handleOnChangeText(value, 'password')}
                            />
                            <FontAwesome
                                name="eye-slash"
                                color={COLORS.primary}
                                size={SIZES.h2}
                                style={{ marginTop: 13 }}
                            />
                        </View>
                    </View>

                    {/* Error */}
                    {error ?
                        <Animatable.View
                            animation="fadeInLeft"
                            duration={500}
                        >
                            <Text style={styles.errorMsg}>{error}</Text>
                        </Animatable.View>
                        : null}

                    {/* Forgot password & Remember me View */}
                    <View style={styles.forgotPassView}>
                        <View style={{ flex: 1, marginLeft: -10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox />
                                <Text style={styles.rememberMe}>
                                    Remember Me
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, marginRight: -10 }}>
                            <View>
                                <Text style={styles.forgotPassText}>
                                    Forgot your password?
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Login button & Social Button View */}
                    <View style={styles.buttonView}>
                        <Button
                            style={[styles.loginButton, styles.shadowButton]}
                            onPress={submitInfo}
                        >
                            Login
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.middleText}>or Login with</Text>
                        {/* Social Button */}
                        <View style={styles.socialLoginView}>
                            <TouchableOpacity
                                icons
                                style={[styles.socialBtn, styles.fbBtn]}
                            >
                                <FontAwesome
                                    name="facebook"
                                    color={COLORS.white}
                                    size={SIZES.h3}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                icons
                                style={[styles.socialBtn, styles.appleBtn]}
                            >
                                <FontAwesome
                                    name="apple"
                                    color={COLORS.white}
                                    size={SIZES.h3}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                icons
                                style={[styles.socialBtn, styles.ggBtn]}
                            >
                                <FontAwesome
                                    name="google"
                                    color={COLORS.white}
                                    size={SIZES.h3}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    brandView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: COLORS.white,
        bottom: 30,
        borderTopStartRadius: SIZES.radius,
        borderTopEndRadius: SIZES.radius,
    },
    bottomTitle: {
        color: COLORS.primary,
        ...FONTS.title
    },
    errorMsg: {
        color: "red",
        marginTop: SIZES.padding,
        ...FONTS.body4
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    formInputFirst: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 30,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary
    },
    formInput: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 18
    },
    rememberMe: {
        marginTop: 5,
        color: COLORS.primary,
        alignSelf: "flex-start"
    },
    forgotPassView: {
        height: 50,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    forgotPassText: {
        marginTop: 5,
        color: COLORS.primary,
        alignSelf: "flex-end"
    },
    middleText: {
        textAlign: 'center',
        color: COLORS.black
    },
    buttonView: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20
    },
    loginButton: {
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        width: SIZES.width / 2,
        justifyContent: 'center',
        color: COLORS.white,
        paddingVertical: 10,
        borderRadius: SIZES.radius,
    },
    socialLoginView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        marginTop: 20,
    },
    socialBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0674e7",
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    fbBtn: {
        backgroundColor: "#0674e7",
    },
    ggBtn: {
        backgroundColor: "#d52d28",
    },
    appleBtn: {
        backgroundColor: COLORS.black,
    },
    shadowButton: {
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: "gold",
    }
});