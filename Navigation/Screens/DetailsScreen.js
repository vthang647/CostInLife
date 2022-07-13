import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Animated} from 'react-native';

// icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// database
import QueryRetriveDay from '../../Models/QueryRetriveDay';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';

// styles
import styles from '../../Styles/AddNewStyle';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// component
import DetailsComponent from '../../Components/DetailsComponent';

// Styles
import Color from '../../Styles/Color';

// loading
import LoadingComponent from '../../Components/LoadingComponent';

// utils
import Helpers from '../../Utils/Helpers';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.dbD = new QueryRetriveDay();
    this.dbE = new QueryRealmDatabaseEarn();
    this.dbS = new QueryRealmDatabaseSpend();
    this.state = {
      offset: new Animated.Value(0),
      Months: [],
      causeTopEarn: [],
      causeTopSpend: [],
      arrsumSpendMonth: [],
      arrsumEarnMonth: [],
      arravgSpendMonth: [],
      arravgEarnMonth: [],
      arr_id_in_month: [],
      avgEarnPerDay: 0,
      avgSpendPerDay: 0,
      sumSpendMonth: 0,
      sumEarnMonth: 0,
      loading: true,
      displayEmtyScreen: false,
    };
  }

  componentDidMount() {
    // this.getQuatityMonth();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getQuatityMonth();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  isLoading(val) {
    return new Promise((resolve, reject) => {
      this.setState({loading: val});
      resolve();
    });
  }

  async getQuatityMonth() {
    await this.isLoading(true);
    await this.getMonths();

    if (this.isEmt()) {
      this.setState({
        displayEmtyScreen: true,
      });
    } else {
      this.setState({
        displayEmtyScreen: false,
      });
      await this.getMonthsArr();
      await this.getSumEarnInMonth();
      await this.getSumSpendInMonth();
      await this.getavgEarn_aDay();
      await this.getavgSpend_aDay();
      await this.getSelectCauseEarn();
      await this.getSelectCauseSpend();
    }
    await this.isLoading(false);
  }

  isEmt() {
    return this.state.Months.length == 0 ? true : false;
  }

  getMonths() {
    return new Promise((resolve, reject) => {
      this.dbD
        .getMonth()
        .then(res => {
          this.setState({Months: [...res]}, () => {
            resolve(this.state.Months);
          });
        })
        .catch(e => {
          console.log(e);
        });
    });
  }

  getSelectCauseEarn() {
    return new Promise((resolve, reject) => {
      this.dbE
        .getSelectCauseTop()
        .then(res => {
          this.setState({causeTopEarn: res});
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  getSelectCauseSpend() {
    return new Promise((resolve, reject) => {
      this.dbS
        .getSelectCauseTop()
        .then(res => {
          this.setState({
            causeTopSpend: res,
          });
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  getMonthsArr() {
    return new Promise((resolve, reject) => {
      this.setState({
        arr_id_in_month: [],
      });
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index].Month;
        this.dbD
          .getId_aMonth(element)
          .then(res => {
            this.setState({
              arr_id_in_month: [...this.state.arr_id_in_month, [...res]],
            });

            if (index == this.state.Months.length - 1) {
              resolve();
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }

  getSumEarnInMonth() {
    return new Promise((resolve, reject) => {
      this.setState({
        arrsumEarnMonth: [],
        sumEarnMonth: 0,
      });

      for (let j = 0; j < this.state.arr_id_in_month.length; j++) {
        const element = this.state.arr_id_in_month[j];
        for (let i = 0; i < element.length; i++) {
          const item = element[i].dsid;
          this.dbE
            .getselectSumDsid(item)
            .then(res => {
              let a = this.state.sumEarnMonth + parseInt(res[0].sum);
              this.setState(
                {
                  sumEarnMonth: a,
                },
                () => {
                  if (
                    j == this.state.arr_id_in_month.length - 1 &&
                    i == element.length - 1
                  ) {
                    this.setState({
                      arrsumEarnMonth: [
                        ...this.state.arrsumEarnMonth,
                        this.state.sumEarnMonth,
                      ],
                      sumEarnMonth: 0,
                    });

                    // a = 0;
                    resolve(this.state.arrsumEarnMonth);
                  }
                },
              );
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    });
  }

  getSumSpendInMonth() {
    return new Promise((resolve, reject) => {
      this.setState({
        arrsumSpendMonth: [],
        sumSpendMonth: 0,
      });

      for (let j = 0; j < this.state.arr_id_in_month.length; j++) {
        const element = this.state.arr_id_in_month[j];

        for (let i = 0; i < element.length; i++) {
          const item = element[i].dsid;
          this.dbS
            .getselectSumDsid(item)
            .then(res => {
              let a = this.state.sumSpendMonth + parseInt(res[0].sum);
              this.setState(
                {
                  sumSpendMonth: a,
                },
                () => {
                  if (
                    j == this.state.arr_id_in_month.length - 1 &&
                    i == element.length - 1
                  ) {
                    this.setState({
                      arrsumSpendMonth: [
                        ...this.state.arrsumSpendMonth,
                        this.state.sumSpendMonth,
                      ],
                      sumSpendMonth: 0,
                    });

                    // a = 0;
                    resolve(this.state.arrsumSpendMonth);
                  }
                },
              );
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    });
  }

  getavgEarn_aDay() {
    return new Promise((resolve, reject) => {
      this.setState({
        arravgEarnMonth: [],
      });
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index];
        let SumMoney = this.state.arrsumEarnMonth[index];

        let dayuse = element.numday;

        let avg = parseInt(SumMoney) / parseInt(dayuse);
        this.setState(
          {
            arravgEarnMonth: [...this.state.arravgEarnMonth, Math.floor(avg)],
          },
          () => {
            resolve();
          },
        );
      }
    });
  }

  getavgSpend_aDay() {
    return new Promise((resolve, reject) => {
      this.setState({
        arravgSpendMonth: [],
      });
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index];
        let SumMoney = this.state.arrsumSpendMonth[index];
        let dayuse = element.numday;

        let avg = parseInt(SumMoney) / parseInt(dayuse);

        this.setState(
          {
            arravgSpendMonth: [...this.state.arravgSpendMonth, Math.floor(avg)],
          },
          () => {
            resolve();
          },
        );
      }
    });
  }

  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.dabutchi,
        }}>
        {this.state.displayEmtyScreen ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="sad-outline" size={99} />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontWeight: '600',
                fontSize: 12,
              }}>
              Empty data ...
            </Text>
          </View>
        ) : (
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.props.navigation.setOptions({
                  tabBarStyle: {
                    display: 'none',
                  },
                });
              } else if (nativeEvent.contentOffset.y == 0) {
                this.props.navigation.setOptions({
                  tabBarStyle: {
                    display: 'flex',
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 8,
                    backgroundcolor: Color.blue_,
                    borderRadius: 15,
                    height: 63,
                    opacity: 0.9,
                  },
                });
              }
            }}>
            {this.state.Months.map((item, index) => {
              return (
                <DetailsComponent
                  key={item.dsid}
                  item={item}
                  sumE={this.state.arrsumEarnMonth[index]}
                  sumP={this.state.arrsumSpendMonth[index]}
                  avgE={this.state.arravgEarnMonth[index]}
                  avgP={this.state.arravgSpendMonth[index]}
                />
              );
            })}
            <View style={styless.item}>
              <Text style={styless.textx}>
                Top 5 Reasons for making money in this month:{' '}
              </Text>
              {this.state.causeTopEarn.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '900',
                        lineHeight: 32,
                      }}>
                      {item.cause} - {Helpers.setMoney(item.money)}{' '}
                      <FontAwesome5 name="money-bill-wave" />
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styless.item}>
              <Text style={styless.textx}>
                Top 5 Reasons to spend money in this month:{' '}
              </Text>
              {this.state.causeTopSpend.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '900',
                        lineHeight: 32,
                      }}>
                      {item.cause} - {Helpers.setMoney(item.money)}{' '}
                      <FontAwesome5 name="money-bill-wave" />
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{height: 100}}></View>
          </ScrollView>
        )}

        {this.state.loading ? <LoadingComponent /> : null}
      </View>
    );
  }
}

const styless = StyleSheet.create({
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
