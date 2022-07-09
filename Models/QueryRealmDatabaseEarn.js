import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'CostLifeDatabase10.db'});

export default class QueryRealmDatabaseEarn {
  constructor() {
    this.init();
  }

  init() {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS earn_cost(id VARCHAR(100) PRIMARY KEY, money DOUBLE(20), cause TEXT, timestamp VARCHAR(100), status BOOLEAN, dsid VARCHAR(100), FOREIGN KEY (dsid) REFERENCES day_spending(dsid))',
        );
      },
      [],
      function (tx, res) {
        console.log('Earn: Create table if not exists');
      },
      function () {
        console.log('not Create table if not exists');
      },
    );
  }

  async getDetails() {
    try {
      return await this.selectAll();
    } catch (e) {
      console.log(e);
    }
  }

  async getDetailsToday() {
    try {
      let day = new Date();
      let today = new String(day).substring(0, 15);
      return await this.selectAllToday(today);
    } catch (e) {
      console.log(e);
    }
  }

  async getselectAllWithdsid(id) {
    try {
      return await this.selectAllWithdsid(id);
    } catch (e) {
      console.log(e);
    }
  }

  async getselectSumDsid(id) {
    try {
      return await this.selectSumMoneyPerDay(id);
    } catch (e) {
      console.log(e);
    }
  }

  async getSelectCauseTop() {
    try {
      return await this.selectCauseTop();
    } catch (e) {
      console.log(e);
    }
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM earn_cost',
          [],
          function (tx, res) {
            console.log('result: ', res.rows.item(res.rows.length - 1));
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            console.log('get SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectAllToday(today) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM earn_cost where timestamp like ?',
          [today + '%'],
          function (tx, res) {
            console.log('result earn: ', res.rows.length);
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectSumMoneyPerDay(dsid) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT dsid, SUM(money) as sum FROM earn_cost where dsid=? GROUP BY dsid',
          [dsid],
          function (tx, res) {
            var temp = [];
            if (res.rows.length <= 0) {
              temp.push({dsid: dsid, sum: 0});
              resolve(temp);
            } else {
              for (let i = 0; i < res.rows.length; ++i) {
                temp.push(res.rows.item(i));
              }
              resolve(temp);
            }
          },
          function (error) {
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectAllWithdsid(dsid) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM earn_cost where dsid=?',
          [dsid],
          function (tx, res) {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            reject(error);
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectCauseTop() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM earn_cost ORDER BY money DESC LIMIT 5',
          [],
          function (tx, res) {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            reject(error);
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  insert(spend_object) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO earn_cost (id, money, cause, timestamp, status, dsid) VALUES (?,?,?,?,?,?)',
        [
          spend_object.id,
          spend_object.money,
          spend_object.cause,
          spend_object.timestamp,
          spend_object.status,
          spend_object.dsid,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('add successfully!');
          } else {
            console.log('add fail!');
          }
        },
      );
    });
  }

  update(spend_object) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE earn_cost set money=?, cause=?, timestamp=?, status=? where id=?',
        [
          spend_object.money,
          spend_object.cause,
          spend_object.timestamp,
          spend_object.status,
          spend_object.id,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  earn_cost where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              resolve(results.rowsAffected);
              console.log('Delete successfully');
            } else {
              console.log('Please insert a valid User Id');
            }
          },
        );
      });
    });
  }
}
