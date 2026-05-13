import { StyleSheet, Platform, StatusBar } from 'react-native';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 
import { moderateScale } from 'react-native-size-matters';
 
export default StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
 
    paddingHorizontal: wp('5%'),
 
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + hp('1%')
        : hp('2%'),
 
    paddingBottom: hp('3%'),
  },
 
  back: {
    fontSize: moderateScale(22),
 
    color: '#000',
 
    marginBottom: hp('2%'),
  },
 
  title: {
    fontSize: moderateScale(22),
 
    fontWeight: '700',
 
    color: '#6D28D9',
 
    textAlign: 'center',
 
    marginBottom: hp('1%'),
  },
 
  subtitle: {
    textAlign: 'center',
 
    color: '#666',
 
    marginBottom: hp('4%'),
 
    fontSize: moderateScale(13),
 
    lineHeight: moderateScale(20),
 
    paddingHorizontal: wp('2%'),
  },
 
  label: {
    marginBottom: hp('1%'),
 
    fontWeight: '600',
 
    color: '#333',
 
    fontSize: moderateScale(13),
  },
 
  /* INPUT + BUTTON */
  inputContainer: {
    flexDirection: 'row',
 
    alignItems: 'center',
 
    backgroundColor: '#fff',
 
    borderRadius: moderateScale(12),
 
    borderWidth: 1,
 
    borderColor: '#ddd',
 
    marginBottom: hp('2.5%'),
 
    paddingRight: wp('1.5%'),
  },
 
  textInput: {
    flex: 1,
 
    paddingVertical: hp('1.8%'),
 
    paddingHorizontal: wp('4%'),
 
    color: '#000',
 
    fontSize: moderateScale(14),
  },
 
  inlineBtn: {
    backgroundColor: '#6D28D9',
 
    paddingVertical: hp('1.2%'),
 
    paddingHorizontal: wp('3%'),
 
    borderRadius: moderateScale(10),
  },
 
  inlineBtnText: {
    color: '#fff',
 
    fontSize: moderateScale(12),
 
    fontWeight: '600',
  },
 
  /* NORMAL INPUT */
  input: {
    backgroundColor: '#fff',
 
    borderRadius: moderateScale(12),
 
    paddingVertical: hp('1.8%'),
 
    paddingHorizontal: wp('4%'),
 
    marginBottom: hp('2.5%'),
 
    borderWidth: 1,
 
    borderColor: '#ddd',
 
    fontSize: moderateScale(14),
 
    color: '#000',
  },
 
  button: {
    backgroundColor: '#0A8F3C',
 
    paddingVertical: hp('2%'),
 
    borderRadius: moderateScale(12),
 
    alignItems: 'center',
 
    marginTop: hp('1%'),
  },
 
  buttonText: {
    color: '#fff',
 
    fontWeight: '600',
 
    fontSize: moderateScale(15),
  },
 
});