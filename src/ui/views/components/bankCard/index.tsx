import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import utils from '../../../utils';

interface ItemProps {
    description: string,
    bankName: string,
    age: number,
    url: string,
}

const BankCard = ({ description, bankName, age, url }: ItemProps): JSX.Element => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
    const iconArrowDown = require('../../../assets/icons/arrow-down.png')
    const iconArrowUp = require('../../../assets/icons/arrow-up.png')
    const { limitString } = utils();

    return (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <View style={styles.logoBank}>
                    <Image source={{ uri: url }} resizeMode="contain" style={styles.img} />
                </View>
            </View>
            <View style={styles.cardRight}>
                <View style={styles.groupRow}>
                    <Text style={styles.label}>Name: </Text>
                    <Text style={{ marginLeft: 10 }}>{limitString(bankName, 20, false)}</Text>
                </View>
                <View style={styles.groupRow}>
                    <Text style={styles.label}>Years: </Text>
                    <Text style={{ marginLeft: 10 }}>{age}</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                    <Text style={styles.label}>Description: </Text>
                    <Text style={{ textAlign: "justify" }}>{limitString(description, 30, isDescriptionVisible)}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => setIsDescriptionVisible(!isDescriptionVisible)} style={styles.btn}>
                <Image source={isDescriptionVisible ? iconArrowDown : iconArrowUp} resizeMode="center" style={styles.btnImg} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        marginTop: 15,
    },
    cardLeft: {
        width: "30%",
        justifyContent: "center"
    },
    logoBank: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        alignSelf: "center"
    },
    img: {
        flex: 1,
    },
    cardRight: {
        width: "70%",
        flexDirection: "column",
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: "#D7DBDD"
    },
    groupRow: {
        flexDirection: "row"
    },
    label: {
        fontWeight: "bold"
    },
    btn: {
        height: 20,
        width: 20,
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 10,
        padding: 2,
    },
    btnImg: {
        flex: 1,
        tintColor: "#800480"
    }
})
export default BankCard;

