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