import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

// style
import ItemStyle from '../Styles/ItemStyle';
import Color from '../Styles/Color';
// utils
import DashBoardItemUtil from '../Utils/DashBoardItemUtil';
import Helpers from '../Utils/Helpers';

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

  componentDidMount() {
    this.initial();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.selectSumMoneySpendPerDay();
        this.selectSumMoneyEarnPerDay();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  async initial() {
    await this.selectSumMoneySpendPerDay();
    await this.selectSumMoneyEarnPerDay();
  }

  selectSumMoneySpendPerDay() {
    return new Promise((resolve, reject) => {
      this.dbS
        .getselectSumDsid(this.state.id)
        .then(res => {
          this.setState({sumSpend: res[0].sum});
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          this.setState({sumSpend: 0});
          reject(err);
        });
    });
  }

  selectSumMoneyEarnPerDay() {
    return new Promise((resolve, reject) => {
      this.dbE
        .getselectSumDsid(this.state.id)
        .then(res => {
          this.setState({sumEarned: res[0].sum});
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          this.setState({sumEarned: 0});
          reject(err);
        });
    });
  }

  render() {
    let {key, navigation, item} = this.props.item;
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
            Sum Earned :${' '}
            <Text style={{fontWeight: 'bold', backgroundColor: Color.lacay}}>
              {Helpers.setMoney(this.state.sumEarned)}
            </Text>{' '}
          </Text>
        </View>
        <View style={ItemStyle.footerItem}>
          <Text style={{fontWeight: 'bold'}}>
            Sum Spend :${' '}
            <Text
              style={{fontWeight: 'bold', backgroundColor: Color.buttonAdd}}>
              {Helpers.setMoney(this.state.sumSpend)}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
