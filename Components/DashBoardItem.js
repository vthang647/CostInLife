import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

// style
import ItemStyle from '../Styles/ItemStyle';
import Color from '../Styles/Color';
// utils
import DashBoardItemUtil from '../Utils/DashBoardItemUtil';
import Helpers from '../Utils/Helpers';

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// database
import QueryRealmDatabaseSpend from '../Models/QueryRealmDatabaseSpend';
import QueryRealmDatabaseEarn from '../Models/QueryRealmDatabaseEarn';

export default class DashBoardItem extends Component {
  constructor(props) {
    super(props);
    this.dbS = new QueryRealmDatabaseSpend();
    this.dbE = new QueryRealmDatabaseEarn();
    this.state = {
      sumSpend: 0,
      sumEarned: 0,
      id: this.props.item.item.dsid,
    };
  }

  render() {
    let {key, navigation, item} = this.props.item;
    const a = () => {
      this.dbS
        .getselectSumDsid(this.state.id)
        .then(res => {
          this.setState({sumSpend: res[0].sum});
        })
        .catch(err => {
          console.log(err);
          this.setState({sumSpend: 0});
        });
    };
    a();

    const b = () => {
      this.dbE
        .getselectSumDsid(this.state.id)
        .then(res => {
          this.setState({sumEarned: res[0].sum});
        })
        .catch(err => {
          console.log(err);
          this.setState({sumEarned: 0});
        });
    };
    b();
    return (
      <TouchableOpacity
        style={ItemStyle.container}
        key={key}
        onPress={() => {
          this.props.navigation.navigate('DetailsThatDay', {obj: item.dsid});
        }}>
        <View style={ItemStyle.headerItem}>
          <Text style={ItemStyle.textHeader}>
            {Helpers.setMonthStringToNumber(item.timestamp)}
          </Text>
        </View>
        <View style={ItemStyle.bodyItem}>
          <Text>
            Total amount eaned <FontAwesome5 name="money-bill-wave" />{' '}
            <Text style={{fontWeight: 'bold', backgroundColor: Color.lacay}}>
              {' '}
              {Helpers.setMoney(this.state.sumEarned)}{' '}
            </Text>{' '}
          </Text>
        </View>
        <View style={ItemStyle.footerItem}>
          <Text>
            Total amount spent <FontAwesome5 name="money-bill-wave" />{' '}
            <Text
              style={{
                fontWeight: 'bold',
                backgroundColor: Color.buttonAdd,
                color: '#fff',
              }}>
              {' '}
              {Helpers.setMoney(this.state.sumSpend)}{' '}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
