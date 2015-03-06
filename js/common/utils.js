/**
 * Created by Jeng on 2014/5/14.
 */
var Utils = {
    getIndexByValue:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return i;
            }
        }
    },
    /**
     * 获取复选框的汇总值
     * @param ele           节点
     * @param realValue     实际值
     * @param prefix
     * @returns {*}
     */
    getCheckedValue: function (ele, realValue, prefix) {
        prefix = prefix ? prefix : ',';
        if(realValue == undefined){
            realValue = "";
        }
        var target = ele.target;
        var arr = realValue.split(prefix);//[1,2,3] ,1
        if (this.getIndexByValue(arr,target.value) >= 0) {
            if (!target.checked) {
                arr.splice(this.getIndexByValue(arr,target.value),1);
                realValue = _.compact(arr).sort().join(prefix);
            }
        } else {
            if (target.checked) {
                arr.push(target.value);
                realValue = _.compact(arr).sort().join(prefix);
            }
        }
        console.log(realValue);
        return realValue;
    },
    /**
     *
     * @param val
     * @param checkValue
     * @param prefix
     * @returns {boolean}
     */
    isCheck: function (val, checkValue, prefix) {
        prefix = prefix ? prefix : ',';
        if (val) {
            if (val instanceof Array) {
                for (var i = 0; i < val.length; i++) {
                    if (val[i] == checkValue) {
                        return true;
                    }
                }
            }else{
                var arr = val.split(prefix);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == checkValue) {
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
    },
    /**
     * 操作全选复选框事件
     **/
    doCheck : function (obj,domName){
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox" &&
                    (inputs[i].id == obj.id || inputs[i].name == domName)){
                inputs[i].checked = obj.checked;
            }
        }
    },
    /**
     * 复选框变化  全选按钮变化
     **/
    toChkSon : function (allDomId,obj) {
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
    },
    /**
     * 获取所有复选框
     **/
    getCheckBox : function (allDomId,domName) {
        var inputs = document.getElementsByTagName("input");
        var chkInputs = new Array();
        var j = 0;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox" && inputs[i].name == domName) //刷选出所有复选框
            {
                chkInputs[j] = inputs[i];
                j++;
            }
        }
        return chkInputs;
    },
    getCheckBoxValue : function(domName,isarray,prefix){
        prefix = prefix ? prefix : ',';
        var inputs = document.getElementsByTagName("input");
        var arr = new Array();
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox" && inputs[i].name == domName && inputs[i].checked){
                arr.push(inputs[i].value);
            }
        }
        return isarray ? arr : arr.join(prefix);
    }
}