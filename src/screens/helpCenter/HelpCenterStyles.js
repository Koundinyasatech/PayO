import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b007a',
    paddingHorizontal: wp('5%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    marginBottom: hp('2%'),
  },

  headerTitle: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginTop: hp('1%'),
    marginBottom: hp('1.5%'),
  },

  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedCategoryBox: {
    backgroundColor: '#cec1e0',
    borderRadius: 12,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedCategoryText: {
    color: '#050505',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  categoryCard: {
    backgroundColor: '#f4eff9',
    borderRadius: moderateScale(12),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1%'),
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: '#00C853',
  },

  categoryText: {
    color: '#000',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#f0ebf6',
    borderRadius: moderateScale(12),
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
    color: '#000',
    marginBottom: hp('2%'),
    fontSize: moderateScale(14),
  },

  textArea: {
    backgroundColor: '#f1eef4',
    borderRadius: moderateScale(12),
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1.5%'),
    color: '#000',
    minHeight: hp('15%'),
    textAlignVertical: 'top',
    marginBottom: hp('2%'),
    fontSize: moderateScale(14),
  },

  uploadButton: {
    backgroundColor: '#5e2bb8',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    marginBottom: hp('2%'),
  },

  uploadText: {
    color: '#fff',
    marginLeft: wp('2%'),
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  notesInput: {
    backgroundColor: '#f7f3fb',
    borderRadius: moderateScale(12),
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1.5%'),
    color: '#000',
    minHeight: hp('12%'),
    textAlignVertical: 'top',
    marginBottom: hp('2%'),
    fontSize: moderateScale(14),
  },

  submitButton: {
    backgroundColor: '#00C853',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    marginBottom: hp('5%'),
  },

  submitText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});