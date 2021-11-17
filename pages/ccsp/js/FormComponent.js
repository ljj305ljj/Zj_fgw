Vue.component('tree',{
	props: {
		item: Object,
	},
	template:
			`<div><template v-if="typeof(item.data.children)=='undefined'">
				<li class="tabBody-li" >
					<div class="word-title"  @click.stop="setValue(item.data.treeName,item.data.treeId)">{{item.data.treeName}}</div>
				</li>
			</template>
			<template v-else>
				<li class="tabBody-li"  :index="item.key">
					<label :class="{'dept-lab':item.data.treeDisabled=='true','people-lab':item.data.treeDisabled=='false'}" @click.stop="item.data.treeDisabled=='false' ? setValue(item.data.treeName,item.data.treeId) : ''"><i  @click.stop="item.data.treeDisabled=='true'?freedeptEvent($event):''"  v-if="item.data.treeDisabled=='true'"  class="rjicon icon-addup" style="padding-right: .4rem;font-size: 1rem;color:#8d8b8b"> </i>{{item.data.treeName}}</label>
					<ul v-if="item.data.treeDisabled=='true'"  class="tree-dept box-dept">
						<tree  v-for="(jItem,jIndex) in item.data.children" :item='{data:jItem,key:(jIndex+item.key)}' @tree-value="setValue">
						</tree>
					</ul>
				</li>
			</template></div>
			<div style="margin: .3rem .2rem .1rem .2rem;display:flex">
									<van-button  native-type="button" plain type="info" block   @click.stop="hides(Datas.item.name)"   style="height: .6rem;line-height: .6rem;   margin: .3em;">取消</van-button>
									<van-button  native-type="button" plain type="info" block @click.stop="setValue(Datas.item.name)" style="height: .6rem;line-height: .6rem;   margin: .3em;">确认</van-button>
								</div>
								`,
	methods:{
		freedeptEvent:function(_this){
			console.log(23);
			if($(_this.currentTarget).parent().hasClass("tree-act")){
				$(_this.currentTarget).attr("class","rjicon icon-addup");
				$(_this.currentTarget).parent().removeClass("tree-act");
			}else{
				$(_this.currentTarget).attr("class","rjicon icon-subup");
				$(_this.currentTarget).parent().addClass("tree-act");
			}
		},
		setValue:function(name,id){
			this.$emit('tree-value', name);
		},
	}
})	

// 树形组件封装
Vue.component('Vtreeselect', {
	props: {
		Trees: Object,
		id: String,
		isFormVield:{
			type: Boolean,
			default: true
		},
		setValue:{
			type:Function,
			default:(expenseIndex) => {
				console.log(expenseIndex);
			},
		}
	},
	template: `<div  :id="id" class="box-dept" style="overflow-y: auto; overflow-x: hidden;padding-bottom:3rem; background: #fff;position:fixed;top:0;width:100%;height:100%;z-index:999" @click.stop>
		<template  v-show="!$.isEmptyObject(Trees)">								
			<tree v-for="(item,index) in Trees" :item='{data:item,key:index}' :isFormVield="isFormVield">
			</tree>									
		</template>
	</div> `,
	created(){
	// alert(this.Trees.expenseIndex)
	},
	methods: {
		setInforMation(expenseIndex){
			console.log(expenseIndex);
		}
	}
});

// 多选组件封装
Vue.component('VanFieldCheckbox', {
	template: `
		<div style="width:100%">
			<van-field
			v-model="resultLabel"
			v-bind="$attrs"
			readonly
			size="large"
			is-link
			input-align="right"
			@click="show = !show"
			/>
			<van-popup v-model="show" position="bottom" class="" >
			<div class="van-picker__toolbar">
				<button type="button" class="van-picker__cancel" @click="cancel">取消</button>
				<div class="van-ellipsis van-picker__title">{{$attrs.label}}</div>
				<button type="button" class="van-picker__confirm" @click="onConfirm">确认</button>
			</div>
			<div class="checkbox-con"  style="max-height:264px;overflow-y:auto">
				<van-cell title="全选">
					<template #right-icon>
						<van-checkbox name="all" @click="toggleAll"  v-model="checkedAll"/>
					</template>
				</van-cell>
				<van-checkbox-group v-model="checkboxValue" @change="change" ref="checkboxGroup">
				<van-cell-group>
					<van-cell
						v-for="(item, index) in columns"
						clickable
						:key="item[option.value]"
						:title="item[option.label]"
						@click="toggle(index)"
					>
					<template #right-icon>
						<van-checkbox :name="item[option.value]" ref="checkboxes" />
					</template>
					</van-cell>
				</van-cell-group>
				</van-checkbox-group>
			</div>
			</van-popup>
		</div> 
	`,
	props: {
		dict: {
			type: String,
			default: function () {
				return ''
			}
		},
		selectValue: {
			type: Array,
			default: function () {
				return []
			}
		},
		option: {
			type: Object,
			default: function () {
			  	return { label: 'label', value: 'value' }
			}
		}
	},
	model: {
		prop: 'selectValue'
	},
	computed: {
		resultLabel: {
			get () {
				if(this.resultValue){
					const res = this.columns.filter(item => {
						return this.resultValue.indexOf(item[this.option.value]) > -1
					})
					const resLabel = res.map(item => {
						return item[this.option.label]
					})
					return resLabel.join(',')
				}
			},
			set () {
		
			}
		},
	},
	data(){
		return {
			columns:[],
			show: false,
			checkboxValue: JSON.parse(JSON.stringify(this.selectValue)),
			checkedAll: false,
			resultValue: JSON.parse(JSON.stringify(this.selectValue))
		  }
	},
	created(){
		let data={
			dictCode:this.dict,
			systemNo: 'ZJSFGW',
		}
		ajaxRequst(ZjgyHost +'/user/rmsDict/getDictItemsByCode','get','application/json;charset=UTF-8','json',data).then(json=>{
			this.columns = json
		})
	},
	methods: {
		getData (val) {//过滤出所选数据的obj集合
		  const res = this.columns.filter(item => {
			return val.indexOf(item[this.option.value]) > -1
		  })
		  return res
		},
		onConfirm () {//确定
		  this.resultValue = this.checkboxValue
		  this.show = !this.show
		  this.$emit('confirm', this.resultValue, this.getData(this.resultValue))
		},
		change (val) {//当数据选中变化时
		  this.$emit('change', val, this.getData(this.resultValue))
		},
		cancel () {//取消
		  this.show = !this.show
		  this.$emit('cancel', this.resultValue)
		},
		toggle (index) {//cell点击事件，同步checkbox
		  this.$refs.checkboxes[index].toggle()
		},
		toggleAll (all) {//全选
			this.checkedAll = !this.checkedAll
		  	this.$refs.checkboxGroup.toggleAll(this.checkedAll)
		}
	},
	watch: {
		selectValue: function (newVal) {
			this.resultValue = newVal
		},
		resultValue (val) {
			this.$emit('input', val)
		},
		checkboxValue (val) {//监听数据变化，判断全选的状态
			if (val.length !== this.columns.length) {
				this.checkedAll = false
			} else {
				this.checkedAll = true
			}
		}
	},
});


//多选人员组织
Vue.component('multi-tree',{
	props: {
		item: Object,
		val:{
			type: Boolean,
			default: ''
		},
		multiple:{
			type: Boolean,
			default: false
		}
	},
	template:
			`<div>
				<template v-if="typeof(item.data.children)=='undefined' || item.data.children.length == 0">
					<li class="tabBody-li" >
						<div class="word-title" @click.stop="choosethis($event)">
							<i class="checkbox rjicon" :class="val.indexOf(item.data.treeId)>-1 ?'icon-selected':'icon-chekbox'" :name="item.data.treeName" :value="item.data.treeId"></i>
							{{item.data.treeName}}
						</div>
					</li>
				</template>
				<template v-else>
					<li class="tabBody-li"  :index="item.key">
						<label :class="{'dept-lab':item.data.treeDisabled=='true','people-lab':item.data.treeDisabled=='false'}" @click.stop="item.data.treeDisabled=='false' ? setValue(item.data.treeName,item.data.treeId) : ''"><i  @click.stop="item.data.treeDisabled=='true'?freedeptEvent($event):''"  v-if="item.data.treeDisabled=='true'"  class="rjicon icon-addup" style="padding-right: .4rem;font-size: 1rem;color:#8d8b8b"> </i>{{item.data.treeName}}</label>
						<ul v-if="item.data.treeDisabled=='true'"  class="tree-dept box-dept">
							<multi-tree  v-for="(jItem,jIndex) in item.data.children" :item='{data:jItem,key:(jIndex+item.key)}' :val="item.data.treeName">
							</multi-tree>
						</ul>
					</li>
				</template>
				<div class="foot-btn">
					<div class="bottom-nav-box"  
					@click="setValue()">
						<span>确定</span>
					</div>
					<div class="bottom-nav-box"  
					@click="close">
						<span>取消</span>
					</div>
				</div>		
			</div>
			`,
			
	methods:{
		freedeptEvent:function(_this){
			console.log(23);
			if($(_this.currentTarget).parent().hasClass("tree-act")){
				$(_this.currentTarget).attr("class","rjicon icon-addup");
				$(_this.currentTarget).parent().removeClass("tree-act");
			}else{
				$(_this.currentTarget).attr("class","rjicon icon-subup");
				$(_this.currentTarget).parent().addClass("tree-act");
			}
		},
		choosethis: function (_this) {
			$(_this.currentTarget).find("i").toggleClass("icon-chekbox");
			$(_this.currentTarget).find("i").toggleClass("icon-selected");
		},
		setValue:function(name,id){
			let nameArr = new Array();
			let idArr = new Array()
			$(".icon-selected").each(function(index, el) {
				nameArr[index] = $(el).attr('name');
				idArr[index] = $(el).attr('value');
			});
			$(".icon-selected").each(function(index, el) {
				$(el).removeClass("icon-selected")
				$(el).addClass("icon-chekbox")
			});
			this.$emit('tree-value', nameArr,idArr);
		},
		close:function(){
			$(".icon-selected").each(function(index, el) {
				$(el).removeClass("icon-selected")
				$(el).addClass("icon-chekbox")
			});
			this.$emit('tree-value', []);
		}
	}
})