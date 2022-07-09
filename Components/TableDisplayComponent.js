import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import styles from '../Styles/AddNewStyle';
import Helpers from '../Utils/Helpers';

export default class TableDisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelMoney: this.props.labelMoney,
    };
  }

  handleDeleteInRow = (index, id) => {
    Alert.alert('Delete', 'Do you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          this.props.handleButtonDelete(index, id);
        },
      },
    ]);
  };

  render() {
    let dataTable = this.props.dataTable;
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.header}>
          <View style={styles.col1}>
            <Text style={{fontWeight: 'bold'}}>##</Text>
          </View>
          <View style={styles.col2}>
            <Text style={{fontWeight: 'bold'}}>{this.state.labelMoney}</Text>
          </View>
          <View style={styles.col3}>
            <Text style={{fontWeight: 'bold'}}>Cause</Text>
          </View>
        </View>
        {dataTable.map((item, index) => {
          return (
            <View key={item.id} style={styles.row1}>
              <TouchableOpacity
                style={styles.row1}
                onPress={index => {
                  this.handleDeleteInRow(index, item.id);
                }}>
                <View style={styles.col1}>
                  <Text style={{fontWeight: 'bold'}}>{index + 1}</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={{fontWeight: 'bold'}}>
                    $ {Helpers.setMoney(item.money)}
                  </Text>
                </View>
                <View style={styles.col3}>
                  <Text style={{fontWeight: 'bold'}}>{item.cause}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
