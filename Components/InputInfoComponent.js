import React, {Component} from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// help in utils folder
import Helpers from '../Utils/Helpers';
// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// styles
import styles from '../Styles/AddNewStyle';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// realm

export default class InputInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initMoneySpend: 0,
      causeSpend: '',
      isPassCause: true,
      isPassMoney: true,
    };
  }

  addToTableSpend = () => {
    if (Helpers.validateEmptyCauses(this.state.causeSpend)) {
      if (Helpers.validateEmptyMoney(this.state.initMoneySpend)) {
        this.setState({isPassCause: true, isPassMoney: true});
        let monneyFilter = Helpers.getMoney(this.state.initMoneySpend);
        const info = {
          id: uuidv4(),
          money: monneyFilter,
          cause: this.state.causeSpend,
          timestamp: '' + new Date(),
          status: true,
          dsid: this.props.dsid.dsid,
        };

        this.props.handleButtonAdd(info);
        this.resetVar();
      } else {
        this.setState({isPassMoney: false});
      }
    } else {
      this.setState({isPassCause: false});
    }
  };

  resetVar = () => {
    this.setState({initMoneySpend: 0, causeSpend: ''});
  };

  render() {
    let sum = this.props.sumM;

    return (
      <SafeAreaView>
        <View style={styles.viewInput}>
          <View style={styles.viewInputDimensionPayment}>
            <Text style={styles.labelSpend}>
              {this.props.labelMoney}{' '}
              <MaterialIcons size={18} name="payments" />
            </Text>
            <TextInputMask
              style={styles.Input}
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: '$ ',
                suffixUnit: '',
              }}
              value={this.state.initMoneySpend}
              onChangeText={text => {
                this.setState({initMoneySpend: text, isPassMoney: true});
              }}
            />
            {!this.state.isPassMoney && (
              <Text
                style={{
                  color: 'red',
                  marginLeft: 15,
                  marginTop: -9,
                  fontSize: 11,
                  fontWeight: 'bold',
                }}>
                money must not be 0
              </Text>
            )}
          </View>

          <View style={styles.viewInputDimensionReason}>
            <Text style={styles.label}>
              Reason <MaterialIcons size={18} name="edit" />
            </Text>

            <TextInput
              style={styles.Input}
              value={this.state.causeSpend}
              onChangeText={text => {
                this.setState(previousState => {
                  return {
                    causeSpend: text,
                    isPassCause: true,
                  };
                });
              }}
              placeholder="Buy playtation game ..."
              selectionColor="black"
            />
            {!this.state.isPassCause && (
              <Text
                style={{
                  color: 'red',
                  marginLeft: 15,
                  marginTop: -9,
                  fontSize: 11,
                  fontWeight: 'bold',
                }}>
                you don't fill in the blank
              </Text>
            )}
          </View>
        </View>
        <View style={styles.viewInput}>
          <View
            style={{
              flex: 8,
              justifyContent: 'flex-end',
              paddingBottom: 8,
            }}>
            <Text
              style={{
                marginLeft: 12,
                marginBottom: 3,
                fontWeight: '600',

                fontSize: 14,
              }}>
              Sum {this.props.labelMoney} : {Helpers.setMoney(sum)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addToTableSpend()}>
            <MaterialIcons size={25} name="add" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
