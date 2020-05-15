import {SafeAreaView, View, Text} from 'react-native';
import tailwind from 'tailwind-rn';
import Bio from "./bio";
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Tailwind = () => (
    <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('pt-12 items-center')}>
            <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
                <Text style={tailwind('text-blue-800 font-semibold')}>
                    Hello Tailwind
                </Text>
            </View>
        </View>
    </SafeAreaView>
);





export default Tailwind
