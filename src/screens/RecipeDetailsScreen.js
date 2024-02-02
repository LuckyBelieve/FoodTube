import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated from "react-native-reanimated";

import Loading from "../components/Loading";

export default function RecipeDetailsScreen(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  let item = props.route.params;

  //   fetching meals detais

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);
  const getMealData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indices = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indices.push(i);
      }
    }
    return indices;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className="flex-1 bg-white"
    >
      <StatusBar style="light" />

      {/* recipe image */}

      <View className="flex-row justify-center">
        <Animated.Image
          sharedTransitionTag={item.strMeal}
          source={{ uri: item.strMealThumb }}
          style={{ width: wp(98), height: hp(50) }}
          className=" rounded-t-[45px] rounded-b-[40px] mt-1"
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-2 ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite((prev) => !prev)}
          className="rounded-full p-2 mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meal desc */}
      {loading ? (
        <Loading size={"large"} className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {meal?.strMeal}
            </Text>
            <Text
              className="font-medium flex-1 text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {meal?.strArea}
            </Text>
          </View>
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center "
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  35
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  min
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center "
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  03
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  people
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center "
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  103
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center "
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View className="flex items-center space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                ></Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>
          {/* ingredients */}
          <View className="space-y-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(2.5) }}
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => (
                <View key={i} className="flex-row items-center gap-1">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full"
                  ></View>
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className=" font-extrabold text-neutral-700"
                    >
                      {meal["strMeasure" + i]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className=" font-medium text-neutral-600"
                    >
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* instructions */}
          <View className="space-y-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(1.5) }}
            >
              Instructions
            </Text>
            <Text className="text-neutral-700" style={{ fontSize: hp(1.6) }}>
              {meal?.strInstructions}
            </Text>
          </View>

          {/* youtube video */}
          {meal?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-neutral-600"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
