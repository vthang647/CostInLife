import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// utils
import Helpers from '../Utils/Helpers';

// icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Styles
import Color from '../Styles/Color';

export default class DetailsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, sumE, sumP, avgE, avgP} = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: 'gray',
              margin: 9,
              borderBottomWidth: 1,
            }}>
            <Text style={{fontSize: 24, fontWeight: '900'}}>
              Month: {item.Month}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              <Text
                style={{
                  backgroundColor: Color.unsafeColor,
                  color: '#ffffff',
                }}>
                +
              </Text>{' '}
              Total amount spent / month:{' '}
              <Text style={{fontSize: 16, fontWeight: '900', lineHeight: 32}}>
                {Helpers.setMoney(sumP)} <FontAwesome5 name="money-bill-wave" />
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              <Text
                style={{
                  backgroundColor: Color.unsafeColor,
                  color: '#ffffff',
                }}>
                +
              </Text>{' '}
              Total amount spent / day:{' '}
              <Text style={{fontSize: 16, fontWeight: '900', lineHeight: 32}}>
                {Helpers.setMoney(avgP)} <FontAwesome5 name="money-bill-wave" />
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              <Text
                style={{
                  backgroundColor: Color.safeColor,
                }}>
                +
              </Text>{' '}
              Total amount Earned / month:{' '}
              <Text style={{fontSize: 16, fontWeight: '900', lineHeight: 32}}>
                {Helpers.setMoney(sumE)} <FontAwesome5 name="money-bill-wave" />
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              <Text
                style={{
                  backgroundColor: Color.safeColor,
                }}>
                +
              </Text>{' '}
              Total amount Earned / day:{' '}
              <Text style={{fontSize: 16, fontWeight: '900', lineHeight: 32}}>
                {Helpers.setMoney(avgE)} <FontAwesome5 name="money-bill-wave" />
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 9,
    margin: 6,
  },
  item: {
    margin: 9,
    borderRadius: 1,
  },
  textx: {
    fontSize: 14,
    lineHeight: 15,
  },
});
