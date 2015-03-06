/**
 * createdBy:river
 * createdDate:2014-05-09
 * mail:ex-lijiang001
 * 公共方法
 * 通用的原生js方法都存放在這個命名空間中pro。
 * 這樣可以減少命名衝突和全局變量污染。為了不造成每一位開發者的
 * 在這個模塊下的命名衝突。
 */
(function(w){
	'use strict';
	var proName = "hcpms";
	var pro = w[proName] = {};//項目的頂級命名空間
    /**
	* pro.define()重新定義。
	* 例如：pro.define("agreement.detail")
	* 則會返回pro.agreement.detail。當前會省略前面的pro。
	* pro.define("pro.agreement.detail")返回的結果跟上面一樣
	* @param nameSpace {string} 命名空间用点区分级次
	* @param callback {function} 可以在定义完之后时候执行,注册到这个
	*  	命名空间中,这里通过的call去调用，所有function中需要使用this
	*   关键字
	* pro.define("module1.module2.module3",function(){
	*	this.var1 = "";
	*	this.func1 = function(){}
	* });
	* 执行结果：
	* pro.module1.module2.module3 {var1:"",func1:function(){]}}
	*/
	pro.define = function(){
		if(arguments.length){
			if(typeof arguments[0] === "string"){
				var attrName = arguments[0].split(".");
				var curSpace = pro;
				for(var i = attrName[0] === "pro" ? 1:0;i<attrName.length;i++){
					curSpace = curSpace[attrName[i]] = {};
				}
			}
			if(typeof arguments[1] === "function"){
				arguments[1].call(curSpace);
			}
			return curSpace;
		}
	};
	 /**
     * 复选框变化  全选按钮变化
     **/
    pro.toChkSon = function (allDomId,obj) {
        //当此复选框未选中 全选为未选
        if (!obj.checked) {
            document.getElementById(allDomId).checked = false;
            return;
        }
        var chkInputs = this.getCheckBox(allDomId,obj.name); //获取所有复选框
        var j = 0;
        for (var i = 0; i < chkInputs.length; i++) {
            if (chkInputs[i].checked == obj.checked)
                j++;
            else
                break;
        }
        if (j == chkInputs.length) //当所有复选框为同一状态时 赋值全选同一状态
            document.getElementById(allDomId).checked = obj.checked;
    };
    /**
     * 获取所有复选框
     * @boxName 复选框名称
     **/
    pro.getCheckBox = function (boxName) {
        var boxs = document.getElementsByName(boxName);
        var chkBoxs = [];
        for (var i = 0; i < boxs.length; i++) {
            //刷选出所有复选框
            if (boxs[i].checked){
                chkBoxs.push(boxs[i].value);
            }
        }
        return chkBoxs;
    };
    /**
     * 打印日志
     * 防止不支持console。log的是浏览器报错.
     * 添加debug模式，当模式为false的时候将关闭所有的打印功能
     **/
    pro.log = function(msg){
    	if(this.config.isDebug){
    		try{
    			console.log(msg)
		    }catch(e){
		    	//防止IE没有打开开发模式，而因为console打印出错。
		    }
	    }
    }
    /**
     * 通过对象的调用关系返回对象中指定对象
     * @param owner {Object}   属主对象
     * @param objStr {String}  对象调用结构
     * @param isSelf {Boolean} 是否从本级开始找，默认从子集
     * @return 返回指定的对象
     * var obj = {
     *      a:{
     *          a:11
     *      }
     * }
     * pro.getObjByStr(obj,"a.a")
     * 11
     *
     * 这个表达式就是返回属主对象中指定的子集
     */
     pro.getObjByStr = function(owner,objStr,isSelf){
         //判断属主对象是否为空
         if(!utils.isNull(owner) && !utils.isNull(objStr)){
             var subSet = objStr.split(".");
             var cur = owner;
             /*如果isSelf为true，则从去掉第一级调用，从子集开始。
             //例如： obj = {}
             //  当需要获得obj中的对象，第二参数包含了obj，则应该将第三个参数
             //设为true，否则会在obj中再查找一下obj，这样会导致对象查找失败。*/
             for(var i = isSelf?1:0;i < subSet.length;i++){
                 //判断对象是否存在
                 if(subSet[i] in cur)
                     cur = cur[subSet[i]];
                 else
                    return null;
             }
             return cur;
         }
     };
    pro.patternRule = {
        integer : '/^[1-9]+[0-9]*]*$/',
        /**
         * 数字校验规则
         * @param n1 限制位数
         * @param n2 保留小数位数
         * @returns {string}
         */
        number : function(n1,n2){
            var p = new RegExp('^-?(([1-9]{1,'+n1+'})|0)(\\.\\d{1,'+n2+'})?$');
            /*console.log(p.test('2'));
            console.log(p.test('0.2'));
            console.log(p.test('2.11'));
            console.log(p.test('0'));
            console.log(p.test('00'));
            console.log(p.test('.0'));*/
            return '/^-?(([1-9]{1,12})|0)(\\.\\d{1,2})?$/';
        }
    };
    /*****************************工具方法******************************************/
	var  utils = pro.utils = {
		/*将数组转换成map*/
		arrayToMap : function (array){
			var map = {};
			if(this.isArray(array)){
				for(var i=0;i<array.length;i++){
					map[array[i]]=array[i];
				}
			}
			return map;
		},
		/**
		* 将Map转换成Array
		* 如果第二个如果传递参数则返回值数组否则返回key数组
		*/
		mapToArray : function (map){
			var arrayKey = [],arrayVal=[];
			for(var i in map){
				arrayKey.push(i);
				arrayVal.push(map[i]);
			}
			return arguments[1] ? arrayVal:arrayKey;

		},
		/*判断是否为undefined*/
		isUndefined : function(o) {
			return typeof(o) === "undefined";
		},
		/* 为undefined替换函数*/
		nvl : function (p, r) {
			if (isUndefined(p) || "" == this.trim(p) || "NaN" == p || null == p)
				return r;
			return p;
		},
		/*字符串转换日期格式*/
		 strtoDate : function (dateStr) {
			var d = dateStr.split("-");
			return new Date(d[0], d[1], d[2]);
		},
		isArray : function(array){
			return toString.call(array) === "[object Array]";
		},
        isString : function(str){
            return typeof str === 'string';
        },
        trim : function(str){
            return this.isString(str) ? str.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : str;
        },
        /**
         * 判断是否为空
         * 1.==undefined
         * 2.==null
         * 3.==""或=="   "
         * 4.=={}
         * 5.==[]
         * @param obj
         * @returns {boolean}
         */
        isBlank : function(obj){
            if(this.isNull(obj) || this.trim(obj) == "")
                return true;
            return false;
        },
        isEquals:function(obj1,obj2){
            obj1 = angular.toJson(obj1);
            obj2 = angular.toJson(obj2);
            return angular.equals(obj1,obj2);
        },
        isNull : function(obj){
            return this.isUndefined(obj) || obj === null || obj === NaN;
        },
        isEmpty : function(obj){
           for(var i in obj)
                return false;
            return true;
        },
        json2FormData : function(obj){
            var str = [];
            for(var p in obj){
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        }
	};
})(window);