import React, {Component} from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';

// component
import DashBoardItem from '../../Components/DashBoardItem';

//database
import QueryRetriveDay from '../../Models/QueryRetriveDay';

//loading
import LoadingComponent from '../../Components/LoadingComponent';

import Color from '../../Styles/Color';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.dbDay = new QueryRetriveDay();

    this.state = {
      loading: true,
      data: [],
    };
  }

  isLoading(val) {
    return new Promise((resolve, reject) => {
      this.setState({loading: val});
      resolve();
    });
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.selectAllDataDaySpending();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async selectAllDataDaySpending() {
    await this.isLoading(true);
    await new Promise((resolve, reject) => {
      this.dbDay
        .selectAll()
        .then(res => {
          this.setState({data: [...res], loading: false}, () => {
            resolve();
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
    await this.isLoading(false);
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    const FlatList_Header = () => {
      return (
        <View
          style={{
            height: 45,
            width: '100%',
            backgroundColor: '#00B8D4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, color: 'white'}}>
            {' '}
            (Day - Month - Year){' '}
          </Text>
        </View>
      );
    };
    const FlatList_Footer = () => {
      return (
        <View
          style={{
            height: 90,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      );
    };
    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.dabutchi,
        }}>
        <FlatList
          data={this.state.data}
          ListHeaderComponent={FlatList_Header}
          ListFooterComponent={FlatList_Footer}
          renderItem={item => {
            return (
              <DashBoardItem
                key={item.dsid}
                navigation={this.props.navigation}
                item={item}
              />
            );
          }}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
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
          }}
          keyExtractor={item => item.dsid}
        />

        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
