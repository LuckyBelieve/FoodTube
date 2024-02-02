import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import RecipeCard from "./RecipeCard";
import RecipeLoading from "./RecipeLoading";
import Loading from "./Loading";

export default function Recipes({ categories, recipes }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || Recipes.length === 0 ? (
          <Loading size={"large"} className="mt-20" />
        ) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}
