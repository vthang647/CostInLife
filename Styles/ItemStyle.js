import {StyleSheet} from 'react-native';

const ItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    margin: 9,
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 3,
  },
  headerItem: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyItem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItem: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemStyle;
