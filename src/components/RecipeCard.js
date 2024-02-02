import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CachedImage } from "../helpers/image";

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
        style={{ width: "100%" }}
        className={`flex justify-center mb-4 space-y-1 ${
          isEven ? "pl-0 pr-[8px]" : "pl-[8px] pr-0"
        }`}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: "100%", height: index % 3 === 0 ? hp(25) : hp(35) }}
          className="bg-black/5 rounded-[35px]"
        />

        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
