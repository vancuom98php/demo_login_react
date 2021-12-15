import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { images, COLORS, SIZES, FONTS } from "../constants"
import userData from "../data/userData";
import { AuthContext } from '../components/context';

export default function SideBar({ route, navigation }) {
    const [users, setUsers] = useState(userData);
    const [email, setEmail] = useState(users[0].email);

    const { logout } = React.useContext(AuthContext);

    async function getUserEmail() {
        const data = await AsyncStorage.getItem('userEmail');
        return data;
    }

    useEffect(() => {
        (async () => {
            setEmail(await getUserEmail());
        })();
    }, []);

    function getIndexUser(users, email) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email == email)
                return i;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...navigation}>
                <ImageBackground
                    source={images.userProfile}
                    style={{ height: SIZES.height / 4, marginTop: -4 }}
                >
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: users[getIndexUser(users, email)].avatar }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{users[getIndexUser(users, email)].name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome
                                name="user"
                                color={COLORS.white}
                                size={SIZES.h2}
                            />
                            <Text>{' '}</Text>
                            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{users[getIndexUser(users, email)].gender}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <DrawerItem
                    icon={() => (
                        <FontAwesome
                            name="film"
                            color={COLORS.primary}
                            size={SIZES.h2}
                        />
                    )}
                    label={users[getIndexUser(users, email)].film + ' film'}
                />
                <DrawerItem
                    icon={() => (
                        <FontAwesome
                            name="globe"
                            color={COLORS.primary}
                            size={SIZES.h2}
                        />
                    )}
                    label={users[getIndexUser(users, email)].country}
                />
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={() => (
                        <FontAwesome
                            name="sign-out"
                            color={COLORS.primary}
                            size={SIZES.h2}
                        />
                    )}
                    label="Logout"
                    onPress={() => { logout() }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: COLORS.lightGray,
        borderTopWidth: 1
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    userName: {
        color: COLORS.white,
        fontWeight: 'bold',
        ...FONTS.h2,
    },
    userEmail: {
        color: COLORS.white,
        ...FONTS.h4,
    }
})