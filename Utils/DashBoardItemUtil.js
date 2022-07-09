const DashBoardItemUtil = {
  refreshHeader: function (day) {
    let result = String(day).substring(3, 15);
    return result;
  },
};

export default DashBoardItemUtil;
