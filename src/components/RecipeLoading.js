import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function RecipeLoading() {
  const recipes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View className=" ml-4 flex flex-row flex-wrap gap-4">
      {recipes.map((recipe, index) => (
        <View key={index}
          className="rounded-[35px] bg-black/5"
          style={{ width: hp(20), height: index % 3 === 0 ? hp(25) : hp(35) }}
        ></View>
      ))}
    </View>
  );
}
