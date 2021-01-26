const fun = {
    /**
     * @param
     * 格式化日期
     */
    constDate(date) {
      const strList = date.split('-');
      let strDate = '';
      if ( (strList[1] * 1) < 10 && (strList[2] * 1) < 10) {
  
        return strDate = strList[0] + '-' + ('0' + strList[1]) + '-' + ('0' + strList[2]);
  
      } else if ( (strList[1] * 1) < 10) {
  
        return strDate = strList[0] + '-' + ('0' + strList[1]) + '-' + strList[2];
  
      } else if ((strList[2] * 1) < 10) {
  
        return strDate = strList[0] + '-' + strList[1] + '-' + ('0' + strList[2]);
      } else {
        return strDate = strList[0] + '-' + strList[1] + '-' + strList[2];
      }
    },
    monthNum: 0,
    /**
     * @param
     * 判断today
     */
    getToday(dayNow) {
      const yearNew = new Date().getFullYear();
      const monthNew = new Date().getMonth() + 1;
      const dayNew = new Date().getDate();
      const timeNew = yearNew + '-' + monthNew + '-' + dayNew;
      dayNow.map((item) => {
        if (item.dateStr === this.constDate(timeNew)) {
          item.className = 'dayCalendar today';
        }
      });
    },
    /**
     * @param
     * 返回本月第一天的星期几
     */
    getFirstWeekDay(year, month) {
      const date = new Date();
      date.setFullYear(year);
      date.setMonth(month - 1);
      date.setDate(1);
      const weekDay = date.getDay() === 0 ? 7 : date.getDay();
  
      return weekDay; // 返回本月第一天的星期几
    },
    /**
     * @param
     * 返回星期几
     */
    getWeekDay(dateDay) {
      const date = new Date(dateDay);
      const weekDay = date.getDay() === 0 ? 7 : date.getDay();
  
      return weekDay;
    },
    /**
     * @param
     * 返回本月天数
     */
    getMonthDay(year, month) {
      const date = new Date();
      date.setFullYear(year);
      date.setMonth(month);
      date.setDate(0);
  
      return date.getDate(); // 返回本月天数
    },
    // 返回日期间隔天数
    /**
     * 
     * @param {xxxx-xx-xx} earliestDay 
     * @param {xxxx-xx-xx} latestDay 
     */
    riliToDayNum(earliestDay, latestDay) {
      let dayTime = 86400000;
      let earliesTime = new  Date(earliestDay).getTime();
      let latestTime = new  Date(latestDay).getTime();
      let dValue = latestTime - earliesTime;
      let forNum = Math.abs(dValue/dayTime);
      
      return forNum;
    },
    // 返回日期区间 
    /**
     * 
     * @param {xxxx-xx-xx} earliestDay 
     * @param {xxxx-xx-xx} latestDay 
     */
    riliToDay(earliestDay, latestDay, that) {
      let dayTime = 86400000;
      // let earliesTime = new  Date(earliestDay).getTime();
      // let latestTime = new  Date(latestDay).getTime();
      // 加上前后一周
      let earliesTime = new  Date(earliestDay).getTime() - dayTime * 3;
      let latestTime = new  Date(latestDay).getTime() + dayTime * 3;
      let dValue = latestTime - earliesTime;
      let forNum = Math.abs(dValue/dayTime);
      let dateArr = [];
      for (let i = 0; i <= forNum; i++) {
        dateArr.push({
          dateStr: this.getDateStrList(earliesTime + dayTime*i),
          weekNum: this.getWeekDay(this.getDateStrList(earliesTime + dayTime*i))
        });
      }
      return dateArr;
    },
    // 获取对应的月范围
    /**
     * 
     * @param {xxxx-xx-xx} earliestDay 
     * @param {xxxx-xx-xx} latestDay 
     */
    getMonthList(earliestDay, latestDay) {
  
      let dayTime = 86400000;
      let earliesTime = new  Date(earliestDay).getTime();
      let latestTime = new  Date(latestDay).getTime();
      let dValue = latestTime - earliesTime;
      // 算出月没有占用的天数
      let yearE = Number(earliestDay.split('-')[0]);
      let monthE = Number(earliestDay.split('-')[1]);
      let dayNumE = new Date(yearE, monthE, 0).getDate();
      
      let earliestDayUseDay = 1;
      for (let i = 0; i < 32; i++) {
        if (new Date(i * dayTime + earliesTime).getMonth() === new Date((i + 1) * dayTime + earliesTime).getMonth()) {
          earliestDayUseDay++;
          
        } else {
          break;
        }
      }
      let numE = dayNumE - earliestDayUseDay;
  
      let yearL = Number(latestDay.split('-')[0]);
      let monthL = Number(latestDay.split('-')[1]);
      let dayNumL = new Date(yearL, monthL, 0).getDate();
      let numL =  dayNumL - new Date(latestDay).getDate();
      // 算出日期差
      let forNum = Math.abs(dValue/dayTime) + numL + numE + numL;
      let dateArr = [];
      let obj = {};
      let monthArr = [];
      let monthType = [];
      // let month
      for (let i = 0; i <= Math.abs(forNum); i++) {
        let date = new Date(earliesTime + dayTime*i);
        if (i !== 0) {
  
          let beforDate = new Date(earliesTime + dayTime*(i - 1));
          // 当索引下的月份不一样 则调用生成日历并添加入月统标题
          if (date.getMonth() !== beforDate.getMonth()) {
  
            this.rili(date, obj, []);
            // 相隔一月 加月统标题
            monthType.push(this.getDateStrList(earliesTime + dayTime*i));
            monthArr.push(...obj.dayNow);
          }
        } else if (i === 0) {
          // 生成当月
          this.rili(date, obj, []);
          monthType.push(this.getDateStrList(earliesTime));
          monthArr.push(...obj.dayNow);
        }
  
      }
  
      return {monthArr, monthType};
    },
    // 获取对应的月间隔
    /**
     * 
     * @param {xxxx-xx-xx} earliestDay 
     * @param {xxxx-xx-xx} latestDay 
     */
    // 获取两月相隔月数
    getMonthInterval(earliestDay, latestDay) {
      var eMonth = Number(earliestDay.split('-')[0]) * 12 + Number(earliestDay.split('-')[1]);
      var lMonth = Number(latestDay.split('-')[0]) * 12 + Number(latestDay.split('-')[1]);
      return lMonth - eMonth;
    },
    /**
     * 
     * @param {日期} date 
     * @param {对象} that 
     * @param {标记的日历} overdueDay 
     */
    // 日历
    rili(date , that, overdueDay) {
  
      that.lastday = [];
      that.dayNow = [];
      that.nextDay = [];
      date = new Date(date);
      const content = document.getElementById('content');
      const str = '';
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const lastMonthDay = this.getMonthDay(year, month - 1); // 获取上月天数
      const weekDay = this.getFirstWeekDay(year, month) - 1; // 获取当月第一天星期几
      const monthDay = this.getMonthDay(year, month); // 获取当月天数
      let lastday = lastMonthDay - weekDay;
      let dayNow = 0;
      let nextDay = 0;
      const dateNow = new Date();
      if (dateNow.getMonth() + 1 === month && dateNow.getFullYear() === year) {
          for (let i = 1; i <= 42; i++) { // 本月的显示
            if (i <= weekDay) { // 显示上月在本月的天数
              lastday++;
              const timeStr =
              month - 1 === 0 ? (year - 1)  + '-' + 12 + '-' + lastday : year + '-' + (month - 1) + '-' + lastday;
              that.lastday.push({day: lastday, className: 'dayCalendar last', dateStr: this.constDate(timeStr), weekNum: this.getWeekDay(timeStr)});
              overdueDay.map( (item) => {
                  if (item === this.constDate(timeStr)) {
                    that.lastday[that.lastday.length - 1].overdue = 'overdue';
                  }
              });
            }
            if (i > weekDay && i < day + weekDay) {
                dayNow++;
                // tslint:disable-next-line:max-line-length
                that.dayNow.push({day: dayNow, className: 'dayCalendar now', dateStr: this.constDate( year + '-' + month + '-' + dayNow), weekNum: this.getWeekDay( year + '-' + month + '-' + dayNow)});
                overdueDay.map( (item) => {
                  if (item === this.constDate( year + '-' + month + '-' + dayNow)) {
                     that.dayNow[that.dayNow.length - 1].overdue = 'overdue';
                  }
                });
            }
            if (i === day + weekDay) {// 当天
                dayNow++;
                // tslint:disable-next-line:max-line-length
                that.dayNow.push({day: dayNow, className: 'dayCalendar now today', dateStr: this.constDate( year + '-' + month + '-' + dayNow), weekNum: this.getWeekDay(year + '-' + month + '-' + dayNow)});
                overdueDay.map( (item) => {
                  if (item === this.constDate( year + '-' + month + '-' + dayNow)) {
                     that.dayNow[that.dayNow.length - 1].overdue = 'overdue';
                  }
                });
            }
            if (i > day + weekDay && i <= weekDay + monthDay) {
                dayNow++;
                // tslint:disable-next-line:max-line-length
                that.dayNow.push({day: dayNow, className: 'dayCalendar now', dateStr: this.constDate( year + '-' + month + '-' + dayNow), weekNum: this.getWeekDay(year + '-' + month + '-' + dayNow)});
                overdueDay.map( (item) => {
                  if (item === this.constDate( year + '-' + month + '-' + dayNow)) {
                     that.dayNow[that.dayNow.length - 1].overdue = 'overdue';
                  }
                });
            }
            if (i >  weekDay + monthDay) {
                nextDay++;
                const timeStr =
                  month + 1 === 13 ? (year + 1)  + '-' + 1 + '-' + nextDay : year + '-' + (month + 1) + '-' + nextDay;
                that.nextDay.push({day: nextDay, className: 'dayCalendar next', dateStr: this.constDate(timeStr), weekNum: this.getWeekDay(timeStr)});
                overdueDay.map( (item) => {
                  if (item === this.constDate(timeStr)) {
                     that.nextDay[that.nextDay.length - 1].overdue = 'overdue';
                  }
                });
            }
        }
      } else {
        for (let j = 1; j <= 42; j++) { // 其他月份的
          if (j <= weekDay) { // 3
              lastday++;
              const timeStr =
                month - 1 === 0 ? (year - 1)  + '-' + 12 + '-' + lastday : year + '-' + (month - 1) + '-' + lastday;
              that.lastday.push({day: lastday, className: 'dayCalendar last', dateStr: this.constDate(timeStr), weekNum: this.getWeekDay(timeStr)});
              overdueDay.map( (item) => {
                if (item === this.constDate(timeStr)) {
                  that.lastday[that.lastday.length - 1].overdue = 'overdue';
                }
            });
          }
          if (j > weekDay && j <= weekDay + monthDay) {
              dayNow++;
              // tslint:disable-next-line:max-line-length
              that.dayNow.push({day: dayNow, className: 'dayCalendar now', dateStr: this.constDate(year + '-' + month + '-' + dayNow), weekNum: this.getWeekDay(year + '-' + month + '-' + dayNow)});
              overdueDay.map( (item) => {
                // console.log(item === this.constDate(year + '-' + month + '-' + dayNow));
                // tslint:disable-next-line:max-line-length
                // console.log('item:' + item + '----------this.constDate:' + this.constDate(year + '-' + month + '-' + dayNow));
                if (item === this.constDate(year + '-' + month + '-' + dayNow)) {
                   that.dayNow[that.dayNow.length - 1].overdue = 'overdue';
                }
              });
          }
          if ( j >  weekDay + monthDay) {
              nextDay++;
              const timeStr =
                  month + 1 === 13 ? (year + 1)  + '-' + 1 + '-' + nextDay : year + '-' + (month + 1) + '-' + nextDay;
              that.nextDay.push({day: nextDay, className: 'dayCalendar next', dateStr: this.constDate(timeStr), weekNum: this.getWeekDay(timeStr)});
              overdueDay.map( (item) => {
                if (item === this.constDate(timeStr)) {
                    that.nextDay[that.nextDay.length - 1].overdue = 'overdue';
                }
              });
          }
      }
    }
    },
    tagIn(that) {
      const left = [];
      const right = [];
      for (let i = 0; i < that.list.length; i++) {
          if (i % 2 === 0) {
              right.push(that.list[i]);
          } else {
              left.push(that.list[i]);
          }
      }
      that.taskMsg = left;
      that.taskMsgR = right;
      that.taskMsgLength = that.taskMsg.length;
      // tslint:disable-next-line:no-console
      console.log(that.list);
    },
    // 年月日时分秒
    getDateStr(item) {
  
      const date = new Date(item);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return year + '-' + month + '-' + dayNew + '-' + hours + ':' + min + ':' + sec;
    },
    //年月日
    getYMD(item) {
  
      const date = new Date(item);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return year + '-' + month + '-' + dayNew ;
    },
    //月日
    getMD(item) {
  
      const date = new Date(item);
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return month + '月' + dayNew + '日' ;
    },
    // 时分秒
    getTimeStr(item) {
  
      const date = new Date(item);
      
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return hours + ':' + min + ':' + sec;
    },
    getDateStrList(item) {
      const date = new Date(item);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return year + '-' + month + '-' + dayNew;
    },
    getNewDateStr(day) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  
      return year + '-' + month + '-' + dayNew;
    },
    // 取小数后几位 代替toFixed
    getToFixed(count, num) {
      
      count += '';
      if (count.indexOf(".") === -1) return Number(count).toFixed(num);
      count = count.substring(0, count.indexOf(".") + num + 1);
      return Number(count)
    },
    setChatList(data) {
      data.map((item, i) => {
        if (item.id && item.json) {
          data.splice(i, 1, {id: item.id, ...item.json});
          // data[i] = {id: item.id, ...item.json}
          // console.log(data);
        }
      });
      this.sortDataList(data, false, 'time');
      // console.log(data);
    },
    // 排序
    sortData(arr, flag, type) {
      for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
              // flag true 升 false 降
              if (flag) {
                  if (Number(arr[j][type]) > Number(arr[j + 1][type])) {
                      let save = {};
                      save = arr[j];
                      arr[j] = arr[j + 1];
                      arr[j + 1] = save;
                  }
              } else {
                  if (Number(arr[j][type]) < Number(arr[j + 1][type])) {
                      let save = {};
                      save = arr[j];
                      arr[j] = arr[j + 1];
                      arr[j + 1] = save;
                  }
              }
          }
      }
    },
    getNewStringDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  
      return year + '-' + month + '-' + dayNew;
    },
    getNewDate(dateStr, num) {
      const dateStrListL = dateStr.split('-');
      const date = new Date();
      date.setFullYear(dateStrListL[0] * 1);
      if (dateStrListL[1].split('0')[0] === '0') {
        date.setMonth((dateStrListL[1].split('0')[1] * 1) - 1);
      } else {
        date.setMonth((dateStrListL[1] * 1) - 1);
      }
      if (dateStrListL[2].split('0')[0] === '0') {
        date.setDate((dateStrListL[2].split('0')[1] * 1) + num);
      } else {
        date.setDate((dateStrListL[2] * 1) + num);
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  
      return year + '-' + month + '-' + dayNew;
    },
    getDateStrListX(item) {
      const date = new Date(item);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayNew = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  
      return year + '/' + month + '/' + dayNew;
    },
    //获取当前时分秒
    getHMS(){
      let myDate = new Date();
      let hour = myDate.getHours(); //获取当前时间(从1970.1.1开始的毫秒数)
      let minu = myDate.getMinutes(); //获取当前小时数(0-23)
      let sec= myDate.getSeconds(); //获取当前分钟数(0-59)
      if(hour < 9){ hour = '0' + hour };
          if(minu < 9){ minu = '0' + minu };
          if(sec < 9){ sec = '0' + sec };
          return hour + ":" + minu + ":" + sec + " "
    },
    //获取当前月日
    getCurrentMD(){
      let time = new Date();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      if(month < 9){ month = '0' + month ;}
      if(day < 9){ day = '0' + day ;}
      return month + "月" + day + '日'
    },
    //获取当前时间年月日时分秒
    timeFormat() { // 时间格式化 2019-09-08
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minu = time.getMinutes();
      let sec = time.getSeconds();
      if(month < 9){ month = '0' + month ;}
      if(day < 9){ day = '0' + day ;}
      if(hour < 9){ hour = '0' + hour ;}
      if(minu < 9){ minu = '0' + minu ;}
      if(sec < 9){ sec = '0' + sec ;}
      return year + "-" + month + "-" + day + " " + " " + hour + ":" + minu + ":" + sec + " "
    },
    //获取当日的前三月
    getLastTime(){
      let last = new Date(new Date().getTime() - 7776000000)
       return last;
    },
    //获取当日的后三月
    getBeforeTime(){
      let before = new Date(new Date().getTime() + 7776000000)
       return before;
    },
    //日期排序
    sortDataList(arr, flag, type) {
      for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
              // flag true 升 false 降
              // if (Fun.getTimeStr(arr[j][type]) === '00:00:00') continue;
              if (flag) {
                  if (Number(new Date(arr[j][type])) > Number(new Date(arr[j + 1][type]))) {
                      let save = {};
                      save = arr[j];
                      arr[j] = arr[j + 1];
                      arr[j + 1] = save;
                  }
              } else {
                  if (Number(new Date(arr[j][type])) < Number(new Date(arr[j + 1][type]))) {
                      let save = {};
                      save = arr[j];
                      arr[j] = arr[j + 1];
                      arr[j + 1] = save;
                  }
              }
          }
      }
  },
  };
  export default fun;