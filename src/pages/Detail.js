import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

/* library */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

/* service/context */
import {arrItemLand, arrSize, descriptionText} from '../services/Constants';

/* component/style */
import MainBackground from '../components/MainBackground';
import {TextBold, TextRegular, TextSemiBold} from '../styles/TextStyles';
import {BLACK, GRAY2, GRAY3, GRAY4, PURPLE2, WHITE} from '../styles/Colors';

const Detail = () => {
  const {width} = Dimensions.get('screen');
  const [data, setData] = useState(arrItemLand);
  const [sizeList, setSizeList] = useState(arrSize);

  useEffect(() => {
    setData(arrItemLand);
    setSizeList(arrSize);
    return () => {
      console.log('unmount detail');
    };
  }, []);

  const [widthItem, setWidthItem] = useState(width);

  const [isFavorite, setIsFavorite] = useState(false);

  const [sizeSelected, setSizeSelected] = useState(0);

  const [selectedIdx, setSelectedIdx] = useState(0);

  const onSelectedSize = (item, idx) => {
    const dat = [...sizeList];
    dat[idx].isSelected === !item.isSelected;
    setSizeList(dat);
  };

  return (
    <View style={styles.container}>
      <MainBackground />

      <View style={styles.detailContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.scrollView}>
          <View style={{marginBottom: width / 5}}>
            <View onLayout={(e) => setWidthItem(e.nativeEvent.layout.width)}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  setSelectedIdx(
                    Math.round(e.nativeEvent.contentOffset.x / widthItem),
                  );
                }}
                renderItem={({item}) => {
                  return (
                    <View style={styles.viewImgDetail(widthItem)}>
                      <Image
                        source={item.picture}
                        style={styles.imgListDetail(widthItem)}
                        resizeMode="cover"
                      />
                      <MaterialCommunityIcons
                        name="gesture-swipe"
                        size={18}
                        color="grey"
                        style={styles.iconSwipe}
                      />
                    </View>
                  );
                }}
              />
              <View style={styles.viewIdxImg}>
                <TextRegular>
                  {selectedIdx + 1}/{data.length}
                </TextRegular>
              </View>
            </View>
            <View style={styles.viewSection1}>
              <View style={styles.subViewSection1}>
                <TextBold style={styles.txtPrice}>$150</TextBold>
                <TextSemiBold style={styles.txtName}>
                  Nike Air Max 2090
                </TextSemiBold>
              </View>
              <View style={styles.viewLikeShare}>
                <Pressable
                  onPress={() => setIsFavorite(!isFavorite)}
                  style={styles.btnLikeShare}>
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={26}
                    color={isFavorite ? 'red' : 'grey'}
                  />
                </Pressable>
                <Pressable style={styles.btnLikeShare}>
                  <Ionicons
                    name="share-social-outline"
                    size={26}
                    color="grey"
                    style={{backgroundColor: GRAY3}}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.viewSection2}>
              <Image
                source={require('../assets/images/nike-land-1.jpg')}
                style={styles.imgSection2(width)}
                resizeMode="cover"
              />
              <Image
                source={require('../assets/images/nike-land-2.jpg')}
                style={styles.imgSection2(width)}
                resizeMode="cover"
              />
              <Image
                source={require('../assets/images/nike-land-3.jpg')}
                style={styles.imgSection2(width)}
                resizeMode="cover"
              />
            </View>
            <View style={styles.viewSection3}>
              <TextSemiBold style={styles.txtTitleSection3}>
                Select Size
              </TextSemiBold>
            </View>
            <View style={styles.viewSizeList}>
              <FlatList
                data={sizeList}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                numColumns={sizeList.length / 2}
                contentContainerStyle={styles.contentSizeList(widthItem)}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      onPress={() => setSizeSelected(item.id)}
                      style={styles.btnSize(width, sizeSelected, index + 1)}>
                      <TextSemiBold
                        style={styles.txtSize(sizeSelected, index + 1)}>
                        {item.size}
                      </TextSemiBold>
                    </Pressable>
                  );
                }}
              />
            </View>
            <View style={styles.viewSection4}>
              <TextSemiBold style={styles.txtTitleSection4}>
                Description
              </TextSemiBold>
              <TextRegular>{descriptionText}</TextRegular>
            </View>
          </View>
        </ScrollView>
        <LinearGradient
          start={{x: 0.0, y: 0.1}}
          end={{x: 0.0, y: 0.3}}
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
          style={styles.viewFooter(width)}>
          <View style={[styles.btnFooter(width), {backgroundColor: GRAY4}]}>
            <TextSemiBold style={[styles.txtButton, {color: BLACK}]}>
              Add To Cart
            </TextSemiBold>
          </View>
          <View style={[styles.btnFooter(width), {backgroundColor: PURPLE2}]}>
            <TextSemiBold style={[styles.txtButton, {color: WHITE}]}>
              Buy Now
            </TextSemiBold>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {flex: 1},
  detailContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  scrollView: {flexGrow: 1},
  viewImgDetail: (widthItem) => ({width: widthItem, padding: 10}),
  imgListDetail: (widthItem) => ({
    height: widthItem / 1.75,
    width: '100%',
    borderRadius: 15,
  }),
  iconSwipe: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  viewIdxImg: {position: 'absolute', right: 30, bottom: 20},
  viewSection1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  subViewSection1: {flex: 3},
  txtPrice: {fontSize: 22},
  txtName: {fontSize: 18},
  viewLikeShare: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnLikeShare: {
    backgroundColor: GRAY3,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  viewSection2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imgSection2: (width) => ({
    width: width / 3.5,
    height: 90,
    borderRadius: 10,
  }),
  viewSection3: {marginHorizontal: 10},
  txtTitleSection3: {fontSize: 18, marginBottom: 10},
  viewSizeList: {
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSizeList: (widthItem) => ({
    width: widthItem,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }),
  btnSize: (width, selectedSize, index) => ({
    width: width / 6.5,
    height: width / 6.5,
    borderWidth: 1,
    borderColor: GRAY2,
    margin: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: selectedSize === index ? BLACK : WHITE,
  }),
  txtSize: (sizeSelected, index) => ({
    color: sizeSelected === index ? WHITE : BLACK,
    fontSize: 18,
  }),
  viewSection4: {marginHorizontal: 10},
  txtTitleSection4: {fontSize: 18, marginBottom: 5},
  viewFooter: (width) => ({
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: width / 5,
    alignItems: 'flex-end',
  }),
  btnFooter: (width) => ({
    height: width / 8,
    width: '45%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
  txtButton: {
    fontSize: 20,
  },
});
