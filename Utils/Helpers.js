const months = [
  {month: 'Jan', val: '01'},
  {month: 'Feb', val: '02'},
  {month: 'Mar', val: '03'},
  {month: 'Apr', val: '04'},
  {month: 'May', val: '05'},
  {month: 'Jun', val: '06'},
  {month: 'Jul', val: '07'},
  {month: 'Aug', val: '08'},
  {month: 'Sep', val: '09'},
  {month: 'Oct', val: '10'},
  {month: 'Nov', val: '11'},
  {month: 'Dec', val: '12'},
];

const Helpers = {
  validateMoney: function (money) {
    let result = String(money).replace('$', '');
    return result;
  },
  validateEmptyMoney: function (money) {
    let result = String(money).replace('$', '');
    return result == 0 ? false : true;
  },
  validateEmptyCauses: function (cause) {
    return String(cause).trim() === '' ? false : true;
  },
  getMoney: function (money) {
    let res = String(money).replace('$', '').trim();
    return String(res).trim().split('.').join('');
  },

  setMonthStringToNumber: function (date) {
    let mon = String(date).substring(1, 4);
    let numMon;
    months.filter(item => {
      if (mon == item.month) {
        numMon = item.val;
      }
    });
    let result = String(date).replace(mon, numMon);
    return result.trim().split(' ').join('-');
  },
  setMoney: function (numMoney) {
    let lengthOfString = String(numMoney).length;
    let arrMoney = String(numMoney).split('');
    let sodu = parseInt(lengthOfString) % parseInt(3);
    let result = '';
    if (sodu != 0) {
      // chia du
      let temp = parseInt(0);
      for (let index = 0; index < arrMoney.length; index++) {
        const element = arrMoney[index];
        if (index < sodu) {
          result = result + element;
        } else if (index == sodu) {
          result += '.';
          result += element;
        } else {
          if (temp < 2) {
            result += element;
            temp++;
          } else {
            result += '.';
            result += element;
            temp = 0;
          }
        }
      }
      return result;
    } else {
      arrMoney.reverse();
      for (let index = 0; index < arrMoney.length; index++) {
        const element = arrMoney[index];
        let temp = (index + 1) % 3;
        if (index == arrMoney.length - 1) {
          result += element;
        } else if (temp == 0) {
          result = result + element + '.';
        } else {
          result += element;
        }
      }
      return result.split('').reverse().join('');
    }
  },
};

export default Helpers;
