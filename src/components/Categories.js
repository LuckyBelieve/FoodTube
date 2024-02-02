import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

// import { categoryData } from "../constants";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories?.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          return (
            <TouchableOpacity
              onPress={() => handleChangeCategory(category.strCategory)}
              className="flex items-center space-y-1"
              key={index}
            >
              <View
                className={`rounded-full p-[6px] ${
                  isActive ? "bg-amber-400" : "bg-black/10"
                }`}
              >
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
