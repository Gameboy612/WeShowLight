import { useState } from 'react';
import InputCard from './InputCard';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function AddCardScreen({ navigation, route }) {

    let card = route.params.card
    let index = route.params.index

    if(!card) card = false
    if(index == undefined) index = -1
    // console.log(card)
    return (
        <View>
            <ScrollView
                decelerationRate={0.85}
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false} 
                overScrollMode='never'
                style={styles.screen_wrapper}
            >
                <View style={styles.input_card}>
                    <InputCard navigation={navigation} card={card} index={index}/>
                </View>

            </ScrollView>
            
        </View>
            
    )
}

const styles = StyleSheet.create(
    {
        input_card: {
            padding: 40
        },
        screen_wrapper: {
        },
        inner_padding: {
            paddingVertical: 20
        },
    }
)