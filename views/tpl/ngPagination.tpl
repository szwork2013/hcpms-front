<div class="Paging" >
	<p>
		<i ng-class="{disabled:!page.isInvalid}" ng-repeat="page in pageList" ng-click="!page.isInvalid || skipPage(page.pageNo)">{{page.name}}</i>
	</p>
	<p>
		每页显示：
		<select ng-model="selLimit" ng-change="changeLimit()">
		    <option ng-repeat="o in limitList" value="{{o.val}}" selected="{{o.val==selLimit}}">{{o.text}}</option>
        </select>
	</p>
	<p>
		{{curPage}}/{{pageSize}}
		<input type="text" ng-model="inPageNo"><button type="button"  ng-click="skipPage(inPageNo)">跳转</button>
	</p>
 </div>
