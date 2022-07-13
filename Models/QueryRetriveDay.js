import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'CostLifeDatabase12.db'});

export default class QueryRetriveDay {
  constructor() {
    this.init();
  }

  init() {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS day_spending(dsid VARCHAR(100) PRIMARY KEY, timestamp VARCHAR(100),Month INT(10), status BOOLEAN)',
        );
      },
      [],
      function (tx, res) {
        console.log('RetriveDay: Create table if not exists');
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

  async getDetailsToday(today) {
    try {
      return await this.iscreatedDay(today);
    } catch (e) {
      console.log(e);
    }
  }

  async getMonth() {
    try {
      return await this.calMonthQuantity();
    } catch (error) {
      console.log(error);
    }
  }

  async getDataWithDsid(dsid) {
    try {
      return await this.selectDataWithDsid(dsid);
    } catch (error) {
      console.log(error);
    }
  }

  async getId_aMonth(month) {
    try {
      return await this.selectAllIdInAMonth(month);
    } catch (error) {
      console.log(error);
    }
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending ORDER BY timestamp DESC',
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

  selectDataWithDsid(dsid) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending where dsid=?',
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
            console.log('get SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectAllIdInAMonth(month) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending where Month=?',
          [month],
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

  calMonthQuantity() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT dsid, Month, timestamp, COUNT(dsid) as numday FROM day_spending group by Month ORDER BY timestamp DESC',
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

  iscreatedDay(today) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending WHERE timestamp like ? ORDER BY timestamp DESC LIMIT 1',
          ['%' + today + '%'],
          function (tx, res) {
            if (res.rows.length > 0) {
              console.log('iscreatedDay', res.rows.item(0));
              resolve(res.rows.item(0));
            } else {
              resolve(null);
            }
          },
          function (error) {
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  insert(preday_object) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO day_spending (dsid, timestamp, Month, status) VALUES (?,?,?,?)',
        [
          preday_object.dsid,
          preday_object.timestamp,
          preday_object.Month,
          preday_object.status,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('insert day_spending ok');
          } else console.log('nsert day_spending Failed');
        },
        err => {
          console.log(err);
        },
      );
    });
  }

  async getDelete(id) {
    try {
      return await this.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  day_spending where dsid=?',
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
          err => {
            reject(err);
            console.log('err ', err);
          },
        );
      });
    });
  }
}
