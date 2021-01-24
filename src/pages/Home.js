import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

/* library */
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

/* services */
import {arrItem, arrItemLand} from '../services/Constants';

/* component/styles */
import {
  PURPLE,
  WHITE,
  GRAY4,
  GRAY3,
  DARK1,
  GRAY1,
  GRAY2,
  BLACK,
} from '../styles/Colors';
import {TextBold, TextSemiBold} from '../styles/TextStyles';
import MainBackground from '../components/MainBackground';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('screen');

  const [data, setData] = useState(arrItem);
  const [data2, setData2] = useState(arrItemLand);
  useEffect(() => {
    setData(arrItem);
    setData2(arrItemLand);
    return () => {
      console.log('unmount home');
    };
  }, []);

  const [widthItem, setWidthItem] = useState(width / 3);

  const [selectedIdx, setSelectedIdx] = useState(0);

  const onPressFav = (item, idx) => {
    const dat = [...data];
    dat[idx].isFavorite = !item.isFavorite;
    setData(dat);
  };

  return (
    <View style={styles.container}>
      <MainBackground />

      <View style={styles.detailContainer}>
        <View style={styles.toolbar}>
          <View style={styles.viewTitleBar}>
            <TextBold style={styles.titleBar}>SHOPIN</TextBold>
          </View>

          <View style={styles.contentToolbar}>
            <View style={styles.viewSearchbar}>
              <Ionicons name="search" size={18} color={GRAY2} />
              <TextInput placeholder="Search" style={styles.inputSearchbar} />
            </View>
            <View style={styles.btnCamera}>
              <Ionicons name="camera-outline" color={DARK1} size={22} />
            </View>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.containerScrollView}>
            <View style={styles.viewBanner}>
              <View onLayout={(e) => setWidthItem(e.nativeEvent.layout.width)}>
                <FlatList
                  data={data2}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.flatListBanner}
                  pagingEnabled
                  onMomentumScrollEnd={(e) => {
                    setSelectedIdx(
                      Math.round(e.nativeEvent.contentOffset.x / widthItem),
                    );
                  }}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.viewDetailBanner(widthItem)}>
                        <Image
                          source={item.picture}
                          resizeMode="cover"
                          style={styles.imageBanner(widthItem, width)}
                        />

                        <View style={styles.descBanner}>
                          <TextSemiBold>Introducing</TextSemiBold>
                          <TextBold>{item.name}</TextBold>
                          <Pressable
                            style={styles.btnBuy(width)}
                            onPress={() => navigation.navigate('Detail')}>
                            <TextSemiBold style={styles.txtBtnBuy}>
                              Buy Now
                            </TextSemiBold>
                          </Pressable>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>

              <View style={styles.dotList}>
                {data2.map((val, i) => {
                  return (
                    <View key={val.id} style={styles.dot(selectedIdx, i)} />
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.viewSection1}>
            <MainFeature
              textMenu="Category"
              sourceImage={require('../assets/icons/category.png')}
            />
            <MainFeature
              textMenu="Compare"
              sourceImage={require('../assets/icons/compare.png')}
            />
            <MainFeature
              textMenu="Sales Event"
              sourceImage={require('../assets/icons/sales.png')}
            />
            <MainFeature
              textMenu="Offers"
              sourceImage={require('../assets/icons/discount.png')}
            />
          </View>

          <View style={styles.viewSection2}>
            <View style={styles.viewSubSection2}>
              <TextBold>New Arrivals</TextBold>

              <Pressable
                style={styles.btnViewAll}
                onPress={() => navigation.navigate('Detail')}>
                <TextSemiBold style={styles.txtBtnViewAll}>
                  View All
                </TextSemiBold>
              </Pressable>
            </View>

            <View style={styles.viewListArrival}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListArrival}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate('Detail')}
                      style={styles.viewItemListArrival(width)}>
                      <Ionicons
                        onPress={() => onPressFav(item, index)}
                        name={item.isFavorite ? 'heart' : 'heart-outline'}
                        size={22}
                        color={item.isFavorite ? 'red' : DARK1}
                        style={styles.iconFav}
                      />

                      <View style={styles.viewImgArrival}>
                        <Image
                          source={item.picture}
                          style={styles.imgArrival(width)}
                          resizeMode="cover"
                        />
                      </View>

                      <TextSemiBold
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.nameItemArrival}>
                        {item.name}
                      </TextSemiBold>

                      <View style={styles.viewTxtColor(width)}>
                        <TextSemiBold style={styles.txtColor}>
                          {item.colors}
                        </TextSemiBold>
                      </View>

                      <View style={styles.viewAmount}>
                        <TextBold style={styles.txtPrice}>
                          {item.price}
                        </TextBold>
                        <Entypo
                          name="plus"
                          color={DARK1}
                          size={24}
                          style={styles.btnPlusAmount}
                        />
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  detailContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  viewTitleBar: {flex: 1},
  titleBar: {color: WHITE, fontSize: 22},
  contentToolbar: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  viewSearchbar: {
    flex: 3,
    borderRadius: 6,
    backgroundColor: GRAY4,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  inputSearchbar: {flex: 1},
  btnCamera: {
    borderRadius: 6,
    backgroundColor: GRAY4,
    padding: 4,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {flexGrow: 1},
  containerScrollView: {paddingHorizontal: 20, marginBottom: 20},
  viewBanner: {
    backgroundColor: GRAY1,
    borderRadius: 20,
    padding: 8,
    elevation: 15,
  },
  flatListBanner: {flexGrow: 1},
  viewDetailBanner: (widthItem) => ({
    flex: 1,
    width: widthItem / 1,
    flexDirection: 'row',
  }),
  imageBanner: (widthItem, width) => ({
    width: widthItem / 2,
    height: width / 3.5,
    alignSelf: 'center',
    borderRadius: 8,
    margin: 8,
  }),
  descBanner: {justifyContent: 'center'},
  btnBuy: (width) => ({
    backgroundColor: BLACK,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: width / 5,
    marginTop: 10,
  }),
  txtBtnBuy: {color: WHITE, fontSize: 11},
  dotList: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: (selectedIdx, i) => ({
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: GRAY2,
    marginHorizontal: 2,
    opacity: selectedIdx === i ? 1 : 0.5,
  }),
  viewSection1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  viewSubSection1: {flex: 1, alignItems: 'center'},
  imgSection1: (width) => ({width: width / 6, height: width / 6}),
  viewSection2: {
    backgroundColor: GRAY3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  viewSubSection2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnViewAll: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    padding: 8,
  },
  txtBtnViewAll: {color: WHITE, fontSize: 11},
  viewListArrival: {marginHorizontal: 10, marginBottom: 30},
  flatListArrival: {flexGrow: 1},
  viewItemListArrival: (width) => ({
    backgroundColor: WHITE,
    borderRadius: 8,
    marginHorizontal: 8,
    paddingVertical: 4,
    width: width / 2.8,
  }),
  iconFav: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },
  viewImgArrival: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  imgArrival: (width) => ({
    width: width / 3,
    height: width / 3,
    borderRadius: 8,
    marginHorizontal: 4,
  }),
  nameItemArrival: {margin: 8, color: DARK1},
  viewTxtColor: (width) => ({
    backgroundColor: GRAY4,
    width: width / 5,
    borderRadius: 4,
    padding: 4,
    marginHorizontal: 8,
  }),
  txtColor: {color: 'grey'},
  viewAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  txtPrice: {fontSize: 18},
  btnPlusAmount: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'grey',
  },
});
