import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

//icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// table & input
import TableDisplayComponent from '../../Components/TableDisplayComponent';
import InputInfoComponent from '../../Components/InputInfoComponent';
import styles from '../../Styles/AddNewStyle';

// REalm database query
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRetriveDay from '../../Models/QueryRetriveDay';

//loading component
import LoadingComponent from '../../Components/LoadingComponent';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// utils
import DashBoardItemUtil from '../../Utils/DashBoardItemUtil';

// color
import Color from '../../Styles/Color';

export default class CreateNewScreen extends Component {
  constructor(props) {
    super(props);
    this.dbDaySpending = new QueryRetriveDay();
    this.dbSpend = new QueryRealmDatabaseSpend();
    this.dbEarn = new QueryRealmDatabaseEarn();
    this.state = {
      labelMoneySpend: 'Money Spend',
      labelMoneyEarn: 'Money Earn',
      dataTableSpend: [],
      dataTableEarn: [],
      loading: true,
      dayCreated: false,
      daySpending: null,
      sumEarn: 0,
      sumSpend: 0,
    };
  }

  componentDidMount() {
    this.initial();
  }

  async initial() {
    await this.setLoading(true);
    await this.getInsertDaySpending();
    await this.preLsSpendCost();
    await this.preLsEarnCost();
    await this.selectSumMoneyEarnPerDay();
    await this.selectSumMoneySpendPerDay();
    await this.setLoading(false);
  }

  setLoading(val) {
    return new Promise((resolve, reject) => {
      this.setState({loading: val});
      resolve(this.state.loading);
    });
  }
  // ------------------------Spend------vv-----------------
  // ------------------------Spend---v--vv--v--------------
  // ------------------------Spend-----vvvv----------------
  handleButtonAddSpend = info => {
    this.dbSpend.insert(info);
    this.selectSumMoneySpendPerDay();
    this.preLsSpendCost();
  };

  selectSumMoneySpendPerDay() {
    return new Promise((resolve, reject) => {
      this.dbSpend
        .getselectSumDsid(this.state.daySpending.dsid)
        .then(res => {
          this.setState({sumSpend: res[0].sum});
          resolve(res);
        })
        .catch(err => {
          reject(err);
          this.setState({sumSpend: 0});
        });
    });
  }

  preLsSpendCost = () => {
    return new Promise((resolve, reject) => {
      this.dbSpend
        .getDetailsToday()
        .then(res => {
          this.setState({dataTableSpend: [...res]});
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  };

  handleButtonDeleteSpend = (index, id) => {
    this.setLoading(true);

    this.dbSpend
      .delete(id)
      .then(res => {
        this.initial();
      })
      .catch(rej => {
        console.log('er r r de lete');
      });
    this.preLsSpendCost();
  };
  // -----------------^^^^-Spend-------------------------
  // ------------------==--Spend-------------------------
  // ------------------==--Spend-------------------------

  // --------------EARN-----v----------------
  preLsEarnCost = () => {
    return new Promise((resolve, reject) => {
      this.dbEarn
        .getDetailsToday()
        .then(res => {
          this.setState({dataTableEarn: [...res]});
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  };

  handleButtonAddEarn = info => {
    this.dbEarn.insert(info);
    this.selectSumMoneyEarnPerDay();
    this.preLsEarnCost();
  };

  selectSumMoneyEarnPerDay() {
    return new Promise((resolve, reject) => {
      this.dbEarn
        .getselectSumDsid(this.state.daySpending.dsid)
        .then(res => {
          this.setState({sumEarn: res[0].sum});
          resolve(res);
        })
        .catch(err => {
          reject(err);
          this.setState({sumEarn: 0});
        });
    });
  }

  handleButtonDeleteEarn = (index, id) => {
    this.setLoading(true);

    this.dbEarn
      .delete(id)
      .then(res => {
        this.initial();
      })
      .catch(rej => {
        console.log('er r r de lete');
      });
    this.preLsEarnCost();
  };
  // -----------------^-------EARN-------------------------
  // handleButtonSave = () => {};

  // Retrive Queryday
  insertDaySpending() {
    const day = new Date();
    let daySpend = {
      dsid: uuidv4(),
      timestamp: DashBoardItemUtil.refreshHeader(day),
      Month: day.getMonth() + 1,
      status: true,
    };

    try {
      this.dbDaySpending.insert(daySpend);
      this.setState({daySpending: daySpend});
    } catch (error) {
      console.log(error);
    }
  }

  getInsertDaySpending() {
    return new Promise((resolve, reject) => {
      let today = DashBoardItemUtil.refreshHeader(new Date());
      this.dbDaySpending.getDetailsToday(today).then(res => {
        if (res != null) {
          this.setState({daySpending: res});
        } else if (res == null) {
          this.insertDaySpending();
        } else {
          console.log('selectDaySpending error');
        }
        resolve(res);
      });
    });
  }

  // selected day spending

  render() {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.dabutchi,
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container}>
            <InputInfoComponent
              handleButtonAdd={this.handleButtonAddSpend}
              dsid={this.state.daySpending}
              resetStatus={this.resetStatus}
              labelMoney={this.state.labelMoneySpend}
              sumM={this.state.sumSpend}
            />
            <TableDisplayComponent
              dataTable={this.state.dataTableSpend}
              labelMoney={this.state.labelMoneySpend}
              handleButtonDelete={this.handleButtonDeleteSpend}
            />
          </View>

          <View style={styles.container}>
            <InputInfoComponent
              handleButtonAdd={this.handleButtonAddEarn}
              dsid={this.state.daySpending}
              resetStatus={this.resetStatus}
              labelMoney={this.state.labelMoneyEarn}
              sumM={this.state.sumEarn}
            />
            <TableDisplayComponent
              dataTable={this.state.dataTableEarn}
              labelMoney={this.state.labelMoneyEarn}
              handleButtonDelete={this.handleButtonDeleteEarn}
            />
          </View>
          <View style={{height: 150}}></View>
        </ScrollView>
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
