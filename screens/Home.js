import React, { useState, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    LayoutAnimation,
} from "react-native";

import flatListData from "../data/flatListData";
import * as Animatable from 'react-native-animatable';

import { images, icons, COLORS, SIZES, FONTS } from '../constants';

export default function Home({ route, navigation }) {
    const [listData, setListData] = useState(flatListData);

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listData];

        array.map((value, placeIndex) => {
            (placeIndex == index) ?
                (array[placeIndex]["isExpanded"] = !array[placeIndex]["isExpanded"]) :
                (array[placeIndex]["isExpanded"] = false);
        })

        setListData(array);
    }

    // Header
    function HomeHeader() {
        return (
            <View style={styles.brandView}>
                <Animatable.Image
                    animation="swing"
                    duration={3000}
                    source={images.logo}
                    style={{
                        height: SIZES.height / 5,
                        width: SIZES.width / 2.5,
                    }}
                />
            </View>
        );
    }

    // List
    function HomeListIdol() {
        const FlatListItem = (props) => {
            const [layoutHeight, setLayoutHeight] = useState(0);

            useEffect(() => {
                if (props.item.isExpanded)
                    setLayoutHeight(null);
                else setLayoutHeight(0);
            }, [props.item.isExpanded]);

            return (
                <View>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={props.onClickFunction}
                    >
                        <Text style={styles.itemText}>
                            {props.item.name}
                        </Text>
                        <View
                            style={{
                                height: layoutHeight,
                                overflow: 'hidden',
                            }}
                        >
                            <View style={styles.listItems}>
                                <View style={styles.listItemContainer}>
                                    <View style={{ marginBottom: SIZES.padding }}>
                                        <Image
                                            source={{ uri: props.item.image }}
                                            resizeMode="contain"
                                            style={styles.itemImage}
                                        />
                                        <View style={[styles.duration, styles.shadow]}>
                                            <Text style={styles.itemDuration}>
                                                {props.item.duration}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Idol Info */}
                                    <View style={styles.infoContainer}>
                                        <View style={styles.itemInfoContainer}>
                                            {/* Rating */}
                                            <Text style={styles.infoRating}>
                                                Đánh giá {' '}
                                            </Text>
                                            <Image
                                                source={icons.star}
                                                style={styles.imageStar}
                                            />
                                            <Text style={styles.infoRating}>
                                                {props.item.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        };

        return (
            <View>
                <FlatList
                    data={flatListData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem
                                item={item}
                                index={index}
                                onClickFunction={() => {
                                    updateLayout(index);
                                }}
                            >
                            </FlatListItem>
                        );
                    }}
                >
                </FlatList>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <HomeHeader />
            <HomeListIdol />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 34 : 0,
        backgroundColor: COLORS.primary
    },
    listItems: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginBottom: SIZES.padding * 2
    },
    item: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    itemText: {
        fontSize: SIZES.h4,
        fontWeight: 'bold'
    },
    listItemContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    itemDuration: {
        fontWeight: "bold",
        ...FONTS.h4
    },
    itemImage: {
        width: SIZES.width,
        height: 200,
        borderRadius: SIZES.radius2,
    },
    itemInfoContainer: {
        marginLeft: 50,
        flexDirection: 'row'
    },
    imageStar: {
        height: 20,
        width: 20,
        tintColor: "gold",
        marginRight: 10
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    infoContainer: {
        marginLeft: 50,
        flexDirection: 'row'
    },
    infoName: {
        marginTop: 5,
        marginRight: 10,
        color: COLORS.white,
        ...FONTS.body2
    },
    infoRating: {
        color: COLORS.primary,
        ...FONTS.body3
    },
    duration: {
        position: "absolute",
        bottom: 1,
        left: 55,
        height: 40,
        width: SIZES.width * 0.2,
        backgroundColor: COLORS.white,
        borderTopRightRadius: SIZES.radius2,
        borderBottomLeftRadius: SIZES.radius2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    brandView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding * 2,
    },
});
