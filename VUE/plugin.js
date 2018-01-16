import { MessageBox, Message } from 'element-ui'
export default{

    install(Vue){    

        // 公共ajax查询
        let context_token = localStorage.getItem('context_token')
        const ajaxSubmit = (actionDo, param, callback) => {
            let url = '/ciaf-proxy/' + actionDo;
            param = param || {};
            Object.assign(param, param, context_token)
            Vue.http.post(url, param).then((res) => {
                let resData = res.data
                if(typeof resData == 'string'){
                    resData = JSON.parse(resData)
                } 
                // 返回结果校验
                if(errCheck(resData)){
                    callback(resData)
                }

            }, (res) => {
                MessageBox.alert('请求错误！', '提示', {
                    confirmButtonText: '确定',
                    type:'error'
                })
                return ;
            })  
        }
        
        
        const ajaxSubmitGet = (actionDo, param, callback) => {  

            let newParam = '';  
            for(var name in param){//把传入的param对象转变成 xx.do?pageNo=0&pageSize=10这种形式
                newParam += name + '=' + param[name] + '&';
            }
            newParam = newParam ? newParam.slice(0,newParam.lastIndexOf('&')) : ''//去掉newParam的最后一个"$"

            let url = ''
            if(param == '' || isEmptyObject(param) == true){
                url = '/ciaf-proxy/' + actionDo + '?timestamp=' + new Date().getTime();
            }else {
                url = '/ciaf-proxy/' + actionDo + '?timestamp=' + new Date().getTime() + '&' + newParam;
            }
            //判断一个对象是否为空
            function isEmptyObject(e) {  
                var t;  
                for (t in e)  
                    return !1;  
                return !0  
            }  
            Vue.http.get(url).then((res) => {
                let resData = res.data
                if(typeof resData == 'string') resData = JSON.parse(resData);

                // resData.errorCode = '999999'
                // 返回结果校验
                if(errCheck(resData)){
                    callback(resData)
                }
                
            }, (res) => {
                MessageBox.alert('请求错误', '提示', {
                    confirmButtonText: '确定',
                    type:'error'
                })
                return
            });
        } 

        // 返回结果校验
        const errCheck = (o) => {

            let obj = {
                '900101' : '该服务已暂停该服务，请留言系统公共！',
                '900202' : '您没有权限访问该服务！',
                '900203' : '您的账户已经被冻结，请联系客户！',
                '900204' : '您的账户已经注销',
                '900404' : '找不到该服务，请确认操作是否合法',
                '9000' : '连接超时',
                '999999' : '用户已经在其他地方登陆',
                '999998' : '用户已经在其他地方登陆',
                'PLT0001' : '链接超时，请重新登陆！',
                'PLT999999' : '系统错误，请联系客服！'
            }
            // 错误检查
            if(o.errorCode != '0000' && !o._DUP_SUBMIT_TOKEN){

                
                if(o.errorCode == 'PLT0001' || o.errorCode == '9000') {

                    sessionStorage.clear(); 
                    window.location.href = '/login'//以后改

                    // 防止重复弹窗
                    // if(document.getElementById('time-out-wrapper')) return false

                    // let div = document.createElement('div')
                    // let wrapper = document.body.appendChild(div)
                    // div.setAttribute("id",'time-out-wrapper')
                    // Message.success({
                    //     customClass: 'time-out',
                    //     duration:2000,
                    //     iconClass:'icon-spinner icon-spin icon-large',
                    //     message: '链接超时，请重试',
                    //     onClose:()=>{
                    //         document.body.removeAttribute('id')
                    //         div.parentNode.removeChild(div)
                    //     }
                    // })
                    return false
                }
                if(obj[o.errorCode]) {
                    MessageBox.alert(obj[o.errorCode], '提示', {
                        confirmButtonText: '确定',
                        type:'error',
                        //将取消按钮重置成错误代码
                        customClass: 'error-div',
                        showCancelButton: true,
                        cancelButtonText: '错误码：' + o.errorCode,
                        cancelButtonClass: 'cancelButtonClass',
                        callback: (action) => {
                            sessionStorage.clear()
                            // console.log(document.getElementsByClassName('error-div'))
                            var errorDiv = document.getElementsByClassName('error-div')
                            if(errorDiv.length > 0){
                                errorDiv[0].style.display = 'none'
                            }
                            window.location.href = '/login'//以后改
                        }
                    })
                    return false;
                }else{
                    MessageBox.alert( o.errorMsg || '请求失败', '提示', {
                        confirmButtonText: '确定',
                        type:'error',
                        //将取消按钮重置成错误代码
                        showCancelButton: true,
                        cancelButtonText: '错误码：' + o.errorCode,
                        cancelButtonClass: 'cancelButtonClass',

                    })
                    return false
                }
            }

            return true
        }

        //登陆的时候会在login.vue中执行this._getParams()
        const getParams = () => {
            let param = { paraType: "2",paraStatus:"1",paraNo: "",paraCode: "",pageSize: "",pageNo: "",paraName: ""} 
            ajaxSubmit( "paramMgt.do", "queryParams", param, (data) => {
                if (data.errorCode == "0000") {
                    localStorage.setItem('params',JSON.stringify(data.paraList))
                }
            })
        }

        // 获取指定参数数组
        const getParaArray = (paramNo) => {
            let result = []
            for(let v of JSON.parse(localStorage.getItem('params'))){
                if (v.paraNo == paramNo) {
                    result.push(v)
                }
            }
            return result
        }

        //参数筛选
        const getParaValue = (paramNo, paraCode) => {
            let result   
            for(let data of JSON.parse(localStorage.getItem('params'))){
                if (data.paraNo == paramNo && data.paraCode == paraCode) {
                    result = data.paraValue
                }
            }
            return result
        }

        //格式化日期20170112
        const comDateFmt = (dateObj, format) => {   
            // let day = dateObj.getDate() > 10 ? dateObj.getDate() : '0' + dateObj.getDate()
            let date = {
                'Y': dateObj.getFullYear(),
                'M': dateObj.getMonth() + 1 > 10 ? dateObj.getMonth() + 1 : '0' + (dateObj.getMonth() + 1),
                'd': dateObj.getDate() > 10 ? dateObj.getDate() : '0' + dateObj.getDate(),
                // 'h': dateObj.getHours() + '0',
                // 'm': dateObj.getMinutes() + '0',
                // 's': dateObj.getSeconds() + '0'
            }
            let newDate =''
            for (let k in date) {
                newDate += date[k]
            }
            return newDate
        }
        const Format = (date,fmt) => { 
            if(typeof date != 'object'){ 
                if(/-/.test(date)){
                    return date.replace(/-/g,'')
                }else{
                    return date 
                }
            }
            let o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(let k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        }

        //格式化日期
        function DateFormat(date) {
            if (date == null || date == "") {
                return "";
            }
            var strdate = "";
            if (date.length == 14) {
                strdate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
                    + " " + date.substr(8, 2) + ":" + date.substr(10, 2) + ":" + date.substr(12, 2);
            }
            if (date.length == 8) {
                strdate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
            }
            if (date.length == 6) {
                strdate = date.substr(0, 2) + ":" + date.substr(2, 2) + ":" + date.substr(4, 2);
            }
            return strdate || '2011-11-11';
        }

        //格式化日期，如将20170112转成2017-01-12
        const dateFormat = (date) => {
            if(date != null && date != "") {
                var year = date ? date.slice(0, 4) : '';
                var month = date ? date.slice(4, 6) : '';
                var date = date ? date.slice(6, 8) : '';
                var rdate = year + "-" + month + "-" + date;
                return rdate;
            }
        }

        //小数点后面不足位数补0
        const formatnumber = (value, num) => { 
             var a, b, c, i; 
             a = value.toString(); 
             b = a.indexOf("."); 
             c = a.length; 
             if (num == 0) { 
                 if (b != -1) { 
                     a = a ? a.slice(0, b) : ''; 
                 } 
             } else {//如果没有小数点 
                if (b == -1) { 
                    a = a + "."; 
                    for (i = 1; i <= num; i++) { 
                        a = a + "0"; 
                    } 
                } else {//有小数点，超出位数自动截取，否则补0 
                    a = a ? a.slice(0, b + num + 1) : ''; 
                    for (i = c; i <= b + num; i++) { 
                        a = a + "0"; 
                    } 
                } 
            }
            return a; 
        }

        //获取当前日期的前一天
        const getDateStr = (s) => {
            var y = parseInt(s.substr(0,4), 10);
            var m = parseInt(s.substr(4,2), 10)-1;
            var d = parseInt(s.substr(6,2), 10);
            var dt = new Date(y, m, d);
            y = dt.getFullYear();
            m = dt.getMonth()+1;
            d = dt.getDate();
            m = m>=10?m:"0"+m;
            d = d>=10?d:"0"+d;
            return y + "-" + m + "-" + d;
        }

        const floatStr = (str,n) => {
            if (str.length >= n){//保留指定位数
                return str.substr(0,n);
            }else if(str.length < n){
                return floatStr(str + "0", n);
            }
        }

        //格式化金额
        //优化负数格式化问题,n等于0的时候，不留小数位
        const formatMoney = (s, n) => {
            n = n >= 0 && n <= 20 ? n : 2;
            var f = s < 0 ? "-" : ""; //判断是否为负数
            s = parseFloat((Math.abs(s) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//取绝对值处理, 更改这里n数也可确定要保留的小数位
            s = s.replace(/\,/g, "");
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for(var i = 0; i < l.length; i++ ) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            var res;
            if(n == 0){
                res = f + t.split("").reverse().join("");
            }else{
                res = f + t.split("").reverse().join("") + "." + ( r ? r.slice(0,n) : '' )
            }
            return res;
        }

        const numberDX = (n) => {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                return "数据非法";
            var unit = "仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
            n += "00";
            var p = n.indexOf('.');
            if (p >= 0 && n)
                n = n.slice(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i=0; i < n.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            return str.replace(/零(仟|佰|拾|角|分)/g, "").replace(/(零)+/g, "").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/圆$/g, "圆整");
        }

        const convertCurrency = (currencyDigits) => {
        // Constants:
            var MAXIMUM_NUMBER = 99999999999.99;
            // Predefine the radix characters and currency symbols for output:
            var CN_ZERO = "零";
            var CN_ONE = "壹";
            var CN_TWO = "贰";
            var CN_THREE = "叁";
            var CN_FOUR = "肆";
            var CN_FIVE = "伍";
            var CN_SIX = "陆";
            var CN_SEVEN = "柒";
            var CN_EIGHT = "捌";
            var CN_NINE = "玖";
            var CN_TEN = "拾";
            var CN_HUNDRED = "佰";
            var CN_THOUSAND = "仟";
            var CN_TEN_THOUSAND = "万";
            var CN_HUNDRED_MILLION = "亿";
            var CN_SYMBOL = "人民币";
            var CN_DOLLAR = "圆";
            var CN_TEN_CENT = "角";
            var CN_CENT = "分";
            var CN_INTEGER = "整";

            var integral;    // Represent integral part of digit number.
            var decimal;    // Represent decimal part of digit number.
            var outputCharacters;    // The output result.
            var parts;
            var digits, radices, bigRadices, decimals;
            var zeroCount;
            var i, p, d;
            var quotient, modulus;

            currencyDigits = currencyDigits.toString();
            if (currencyDigits == "") {
                return "";
            }
            if (currencyDigits.match(/[^,.\d]/) != null) {
                return "";
            }
            if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                return "";
            }

            currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters.
            currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning.
            // Assert the number is not greater than the maximum number.
            // if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            //     return "金额过大，应小于1000亿元！";
            // }

            parts = currencyDigits.split(".");
            if (parts.length > 1) {
                integral = parts[0];
                decimal = parts[1];
                decimal = decimal.substr(0, 2);
            }
            else {
                integral = parts[0];
                decimal = "";
            }
            digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
            radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
            bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
            decimals = new Array(CN_TEN_CENT, CN_CENT);
            // Start processing:
            outputCharacters = "";
            // Process integral part if it is larger than 0:
            if (Number(integral) > 0) {
                zeroCount = 0;
                for (i = 0; i < integral.length; i++) {
                    p = integral.length - i - 1;
                    d = integral.substr(i, 1);
                    quotient = p / 4;
                    modulus = p % 4;
                    if (d == "0") {
                        zeroCount++;
                    }
                    else {
                        if (zeroCount > 0)
                        {
                            outputCharacters += digits[0];
                        }
                        zeroCount = 0;
                        outputCharacters += digits[Number(d)] + radices[modulus];
                    }
                    if (modulus == 0 && zeroCount < 4) {
                        outputCharacters += bigRadices[quotient];
                        zeroCount = 0;
                    }
                }
                outputCharacters += CN_DOLLAR;
            }
            // Process decimal part if there is:
            if (decimal != "") {
                for (i = 0; i < decimal.length; i++) {
                    d = decimal.substr(i, 1);
                    if (d != "0") {
                        outputCharacters += digits[Number(d)] + decimals[i];
                    }
                }
            }
            // Confirm and return the final output string:
            if (outputCharacters == "") {
                outputCharacters = CN_ZERO + CN_DOLLAR;
            }
            if (decimal == "") {
                outputCharacters += CN_INTEGER;
            }
            outputCharacters = outputCharacters;
            return outputCharacters;
        }

        const clearNoNum = (event,obj) => {
            var value=obj.value;
            var regStrs = [
                ['^\\.(\\d?)$', ''], //禁止录入以小数点开头
                ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                ['^(\\d+\\.\\d{2}).+', '$1']  //禁止录入小数点后两位以上
            ];
            for (i = 0; i < regStrs.length; i++) {
                var reg = new RegExp(regStrs[i][0]);
                if(reg.test(value)){
                    value = value.replace(reg, regStrs[i][1]);
                    obj.value = value;
                }
            }
        }


        const clearNoNum2 = (val) => {
            var regStrs = [
                ['^\\.(\\d?)$', ''], //禁止录入以小数点开头
                ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                ['^(\\d+\\.\\d{2}).+', '$1']  //禁止录入小数点后两位以上
            ];
            for (var i = 0; i < regStrs.length; i++) {
                var reg = new RegExp(regStrs[i][0]);
                if(reg.test(val)){
                    val = val.replace(reg, regStrs[i][1]);
                    return val
                }
            }
        }
      
        //数字自动转换人民币金额
        const nst = (t) => {//blur时
            var stmp = "";
            if(t == stmp) return '';
            var ms = t.replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
            var txt = ms.split(".");
            while(/\d{4}(,|$)/.test(txt[0]))
                txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
            return txt[0]+(txt.length>1?"."+txt[1]:".00");
        }

        const rmoney = (s) => {//focus时
            s = s + '';
            if(s != null && s !=""){
                return parseFloat(s.replace(/[^\d\.-]/g, ""));
            }else return ""
        }

        // 将银行账号每四位加一个空格
        const accountFormat = (accNum) => {
            if(accNum == null || accNum == "" || accNum == "null"){
                return ""
            }else{
                return accNum.substr(0,4) + " " + accNum.substr(4,4) + " " + accNum.substr(8,4) + " " + accNum.substr(12,4) + " " + accNum.substr(16,4) + " " + accNum.substr(20,4);
            }
        }

        // 获取当前浏览器名 及 版本号
        const appInfo = () => {  
            var browser = {appname: 'unknown', version: 0},  
                userAgent = window.navigator.userAgent.toLowerCase();  // 使用navigator.userAgent来判断浏览器类型
            //msie,firefox,opera,chrome,netscape  
            if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){  
                browser.appname = RegExp.$1;  
                browser.version = RegExp.$2;  
            } else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari  
                browser.appname = 'safari';  
                browser.version = RegExp.$2;  
            }  
            return browser;  
        }


        // vue全局方法注入
        Vue.prototype._appInfo = appInfo
        Vue.prototype._ajaxSubmit = ajaxSubmit
        Vue.prototype._ajaxSubmitGet = ajaxSubmitGet
        Vue.prototype._getParams = getParams
        Vue.prototype._getParaArray = getParaArray
        Vue.prototype._getParaValue = getParaValue
        Vue.prototype._dateFormat = dateFormat
        Vue.prototype._formatnumber = formatnumber
        Vue.prototype._DateFormat = DateFormat
        Vue.prototype._getDateStr = getDateStr
        Vue.prototype._floatStr = floatStr
        Vue.prototype._formatMoney = formatMoney
        Vue.prototype._Format = Format
        Vue.prototype._comDateFmt= comDateFmt
        Vue.prototype._numberDX = numberDX
        Vue.prototype._convertCurrency = convertCurrency
        Vue.prototype._clearNoNum = clearNoNum
        Vue.prototype._clearNoNum2 = clearNoNum2
        Vue.prototype._nst = nst
        Vue.prototype._rmoney = rmoney
        Vue.prototype._accountFormat = accountFormat
        Vue.prototype._errCheck = errCheck

        
    }
}