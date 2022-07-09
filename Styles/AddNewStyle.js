import {StyleSheet} from 'react-native';
import Color from './Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  row1: {
    flex: 1,
    flexDirection: 'row',
  },
  col1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  col2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  col3: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndWidth: 0.5,
    borderBottomWidth: 0.5,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#dddddd',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  Input: {
    height: 40,
    margin: 12,
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 1,
    borderRadius: 5,
    padding: 10,
  },
  viewInputDimensionPayment: {
    flex: 4,
  },
  button: {
    flex: 2,
    margin: 3,
    alignItems: 'center',
    // backgroundColor: '#ff2448',
    backgroundColor: Color.green_2,
    elevation: 5,
    borderRadius: 5,
    padding: 15,
  },
  btnSave: {
    margin: 12,
    alignItems: 'center',
    backgroundColor: '#ff2448',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    width: 150,
    height: 200,
  },
  viewInputDimensionReason: {
    flex: 6,
  },
  viewInput: {
    flex: 1,
    flexDirection: 'row',
  },
  viewButtonSave: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 12,
    marginLeft: 12,
    marginTop: 15,
    fontWeight: 'bold',
  },

  labelSpend: {
    fontSize: 12,
    marginLeft: 12,
    marginTop: 15,
    fontWeight: 'bold',
  },
});

export default styles;
