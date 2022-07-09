import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Helpers from '../Utils/Helpers';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCol: this.props.numCol,
      // {title: [], style:[{}]}
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
    let arrStyleObject = this.props.arrStyleObject;
    let styleContents = this.props.styleContents;
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={{marginLeft: 9, marginRight: 3}}>
        <View style={styles.header}>
          {arrStyleObject.map((item, index) => {
            return (
              <View key={item.id} style={item.style}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              </View>
            );
          })}
        </View>

        {dataTable.map((item, index) => {
          return (
            <View key={item.id} style={styles.header}>
              <View style={styleContents[0]}>
                <Text>{item.cause}</Text>
              </View>
              <View style={styleContents[1]}>
                <Text>$ {Helpers.setMoney(item.money)}</Text>
              </View>
              <View style={styleContents[2]}>
                <Text>{item.timestamp}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  header1: {
    flex: 1,
    flexDirection: 'column',
  },
});
