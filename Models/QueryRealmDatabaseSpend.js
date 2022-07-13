import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'CostLifeDatabase12.db'});

export default class QueryRealmDatabaseSpend {
  constructor() {
    this.init();
  }

  init() {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS spend_cost(id VARCHAR(100) PRIMARY KEY, money DOUBLE(20), cause TEXT, timestamp VARCHAR(100), status BOOLEAN, dsid VARCHAR(100), FOREIGN KEY (dsid) REFERENCES day_spending(dsid))',
        );
      },
      [],
      function (tx, res) {
        console.log('Spend: Create table if not exists');
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
          'SELECT * FROM spend_cost',
          [],
          function (tx, res) {
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
          'SELECT * FROM spend_cost where timestamp like ? ORDER BY timestamp DESC',
          [today + '%'],
          function (tx, res) {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            console.log('test ... ', temp);
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
          'SELECT dsid, SUM(money) as sum FROM spend_cost where dsid=? GROUP BY dsid',
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
          'SELECT * FROM spend_cost where dsid=?',
          [dsid],
          function (tx, res) {
            console.log(res.rows.length);
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

  selectCauseTop() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM spend_cost ORDER BY money DESC LIMIT 5',
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
        'INSERT INTO spend_cost (id, money, cause, timestamp, status, dsid) VALUES (?,?,?,?,?,?)',
        [
          spend_object.id,
          spend_object.money,
          spend_object.cause,
          spend_object.timestamp,
          spend_object.status,
          spend_object.dsid,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('insert spend data succesfully');
          } else console.log('Add Failed');
        },
        err => {
          console.log(err);
        },
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM spend_cost WHERE id like ?',
          [id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(results.rowsAffected);
              console.log('Delete Successfully!');
            } else {
              console.log('Please insert a valid User Id');
            }
          },
        );
      });
    });
  }

  closeDB() {}
}
