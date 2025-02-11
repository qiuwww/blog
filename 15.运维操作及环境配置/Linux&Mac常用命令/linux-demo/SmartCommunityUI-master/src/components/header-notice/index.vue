<template>
	<span class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in">
        <Notification
                :wide="isMobile"
                :badge-props="badgeProps"
                class="i-layout-header-notice"
                :class="{ 'i-layout-header-notice-mobile': isMobile }"
                auto-count
                @on-load-more="handleLoadMore"
                @on-clear="handleClear"
        >
            <Icon slot="icon" custom="i-icon i-icon-notification" />
            <NotificationTab
                    title="通知"
                    name="message"
                    :count="unreadMessage"
                    :loaded-all="messageList.length >= 15"
                    :loading="messageLoading"
                    :scroll-to-load="false"
            >
            <NotificationItem
                    v-for="(item, index) in messageList"
                    :key="index"
                    :title="item.title"
                    :icon="item.icon"
                    :icon-color="item.iconColor"
                    :time="item.time"
                    :read="item.read"
                    @click.native="messageClick(index)"
            />
        </NotificationTab>
        <!--<NotificationTab
                title="已读"
                name="follow"
                :count="unreadFollow"
                :loaded-all="followList.length >= 15"
                :loading="followLoading"
                :scroll-to-load="false"
        >
            <NotificationItem
                    v-for="(item, index) in followList"
                    :key="index"
                    :avatar="item.avatar"
                    :title="item.title"
                    :time="item.time"
                    :read="item.read"
            />
        </NotificationTab>-->
        <NotificationTab
                title="待办"
                name="todo"
                :count="unreadTodo"
                :loaded-all="todoList.length >= 15"
                :loading="todoLoading"
                :scroll-to-load="false"
        >
            <NotificationItem
                    v-for="(item, index) in todoList"
                    :key="index"
                    :title="item.title"
                    :content="item.content"
                    :tag="item.tag"
                    :tag-props="item.tagProps"
                    :read="item.read"
                    :clickClose="false"
                    @click.native="todoClick(index)"

            />
        </NotificationTab>
        </Notification>
    </span>
</template>
<script>
	import Cookies from "js-cookie";
	import { mapState } from 'vuex';
	import request from '@/utils/request';
	import Avatar from '@/assets/images/useravatar.svg';
	export default {
		name: 'iHeaderNotice',
		data() {

			return {
				badgeProps: {
					offset: [20, 0]
				},
				messageBaseList: [{
						icon: 'md-mail',
						iconColor: '#3391e5',
						title: '蒂姆·库克回复了你的邮件',
						read: 1,
						time: 1557297198
					},
					{
						icon: 'md-home',
						iconColor: '#87d068',
						title: '乔纳森·伊夫邀请你参加会议',
						read: 0,
						time: 1557297198
					},
					{
						icon: 'md-information',
						iconColor: '#fe5c57',
						title: '斯蒂夫·沃兹尼亚克已批准了你的休假申请',
						read: 1,
						time: 1557297198
					},
					{
						icon: 'md-star',
						iconColor: '#ff9900',
						title: '史蒂夫·乔布斯收藏了你的文章',
						read: 1,
						time: 1557297198
					},
					{
						icon: 'md-people',
						iconColor: '#f06292',
						title: '比尔·费尔南德斯通过了你的好友申请',
						read: 1,
						time: 1557297198
					}
				],
				followBaseList: [{
						avatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
						title: '史蒂夫·乔布斯 关注了你',
						read: 1,
						time: 1557299299
					},
					{
						avatar: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
						title: '斯蒂夫·沃兹尼亚克 关注了你',
						read: 1,
						time: 1557299299
					},
					{
						avatar: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
						title: '乔纳森·伊夫 关注了你',
						read: 0,
						time: 1557299299
					},
					{
						avatar: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
						title: '蒂姆·库克 关注了你',
						read: 1,
						time: 1557299299
					},
					{
						avatar: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
						title: '比尔·费尔南德斯 关注了你',
						read: 1,
						time: 1557299299
					}
				],
				todoBaseList: [{
						title: '2019 下半年 OKR',
						content: '需要在 2019-06-14 之前完成',
						tag: '未开始',
						tagProps: {
							color: 'default'
						},
						read: 1
					},
					{
						title: '公孙离的面试评审',
						content: '需要在 2019-06-14 之前完成',
						tag: '即将到期',
						tagProps: {
							color: 'red'
						},
						read: 0
					},
					{
						title: 'iView 三周年生日会',
						content: '需要在 2019-07-28 之前完成',
						tag: '进行中',
						tagProps: {
							color: 'blue'
						},
						read: 1
					},
					{
						title: 'iView 三周年生日会',
						content: '需要在 2019-07-28 之前完成',
						tag: '进行中',
						tagProps: {
							color: 'blue'
						},
						read: 1
					}
				],
				messageList: [],
				followList: [],
				todoList: [],
				messageDataList: [],
				todoDataList: [],
				messageLoading: false,
				followLoading: false,
				todoLoading: false,
				params: {
					userId: JSON.parse(Cookies.get("userInfo")).id,
					status: 0,
					pageNumber: 1, // 当前页数
					pageSize: 5, // 页面大小
					sort: "createTime", // 默认排序字段
					order: "desc", // 默认排序方式
					count: 0
				},
				params1: {
					userId: JSON.parse(Cookies.get("userInfo")).id,
					status: 1,
					pageNumber: 1, // 当前页数
					pageSize: 5, // 页面大小
					sort: "createTime", // 默认排序字段
					order: "desc", // 默认排序方式
					count: 0
				},
				params2: {
					applyer: '',
					tyjrdz: '',
					name: '',
					tnames: '',
					startDate: '',
					endDate: '',
					count: 0,
					sort: 'createTime', // 默认排序字段
					order: 'desc', // 默认排序方式
					pageNumber: 1, // 当前页数
					pageSize: 5 // 页面大小
				},
				searchForm: {
					// 搜索框对应data对象
					applyer: '',
					tyjrdz: '',
					name: '',
					tnames: '',
					startDate: '',
					endDate: '',
					count: 0,
					sort: 'createTime', // 默认排序字段
					order: 'desc', // 默认排序方式
					pageNumber: 1, // 当前页数
					pageSize: 5 // 页面大小
				},
				title: ""
			}
		},
		computed: {
			...mapState([
				'isMobile'
			]),
			unreadMessage() {
				let unread = 0;
				this.messageList.forEach(item => {
					if(!item.read) unread++;
				});
				return unread;
			},
			unreadFollow() {
				let unread = 0;
				this.followList.forEach(item => {
					if(!item.read) unread++;
				});
				return unread;
			},
			unreadTodo() {
				let unread = 0;
				this.todoList.forEach(item => {
					if(!item.read) unread++;
				});
				return unread;
			}
		},
		methods: {
			handleLoadMore(tab) {
				if(tab.name == "message") {
					if(this.params2.count > this.params2.pageNumber * this.params2.pageSize) {
						this.params2.pageNumber++;
						this.initMessage();
					}
				} else if(tab.name == "follow") {
					if(this.params1.count > this.params1.pageNumber * this.params1.pageSize) {
						this.params1.pageNumber++;
						this.initReadMessage();
					}
				} else if(tab.name == "todo") {
					if(this.searchForm.count > this.searchForm.pageNumber * this.searchForm.pageSize) {
						this.searchForm.pageNumber++;
						this.initTotoMessage();
					}
				}
				//this.loadMore(tab.name);
			},
			loadMore(type) {
				if(this[`${type}Loading`]) return;
				this[`${type}Loading`] = true;
				setTimeout(() => {
					this[`${type}List`] = this[`${type}List`].concat([...this[`${type}BaseList`]]);
					this[`${type}Loading`] = false;
				}, 1000);
			},
			handleClear(tab) {
				this.clearUnread(tab.name);
				//				if(tab.name=="message"){
				//					let ids=[];
				//					for(let index in this.messageList){
				//						let item =  this.messageList[index];
				//						if(item.read==0){
				//							ids.push(item.id);
				//						}
				//					}
				//					this.batchEditMessage(ids);
				//				}

			},
			clearUnread(type) {
				this[`${type}List`] = this[`${type}List`].map(item => {
					item.read = 1;
					return item;
				});
			},
			// 分页获取消息推送数据
			getMessageSendData(params) {
				return request({
					method: 'get',
					url: '/api/messageSend/getByCondition',
					params

				});

			},
			// 编辑发送消息
			editMessageSend(params) {
				return request({
					method: 'post',
					url: '/api/messageSend/edit',
					params,
					transformRequest: [function(data) {
						let ret = '';
						for(let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
						}
						ret = ret.substring(0, ret.length - 1);
						return ret;
					}]

				});
			},
			// 批量编辑
			batchEditMessageSend(ids, params) {
				//				return request({
				//					method: 'post',
				//					url: '/api/batchEdit/{ids}',
				//					data:params,
				//
				//				});
				return request({
					url: '/api/messageSend/batchEdit',
					method: 'post',
					data: ids
				})
			},
			// 删除发送消息
			deleteMessageSend(ids, params) {

				return request({
					method: 'delete',
					url: '/api/messageSend/delByIds/${ids}',
					data: params,

				});
			},
			// 分页获取消息推送数据
			getTodoMessageSendData(params) {
				return request({
					method: 'get',
					url: '/api/actAplayTask/todoList',
					params

				});

			},
			initMessage() {
				this.getTodoMessageSendData(this.params2).then(res => {
					if(res && res.success) {
						this.params2.count = res.data.totalElements;
						for(let index in res.data.content) {

							let item1 = {};
							item1.icon = this.messageBaseList[index].icon;
							item1.iconColor = this.messageBaseList[index].iconColor;
							item1.read = 0;
							item1.time = res.data.content[index].createTime;
							item1.title = "您当前编号为"+res.data.content[index].bh+"的"+res.data.content[index].actTaskName+"任务" ;
							item1.id = res.data.content[index].id;
							this.messageList.push(item1);
							this.messageDataList.push(res.data.content[index]);
						}
					}
				});
			},
			initReadMessage() {
				this.params1.status = 0;
				this.getMessageSendData(this.params1).then(res => {
					if(res && res.success) {
						this.params1.count = res.data.totalElements;
						for(let index in res.data.content) {
							let item = {};
							item.avatar = Avatar;
							item.read = 1;
							item.time = res.data.content[index].createTime;
							item.title = res.data.content[index].title;
							item.id = res.data.content[index].id;
							this.followList.push(item);
						}
					}

				});
			},
			initTotoMessage() {
				this.getTodoMessageSendData(this.searchForm).then(res => {
					if(res && res.success) {
						this.searchForm.count = res.data.totalElements;
						for(let index in res.data.content) {
							let item = {};
							item.read = 1;
							item.time = res.data.content[index].createTime;
							item.title = res.data.content[index].actTaskName;
							item.content = "编号：" + res.data.content[index].bh;
							item.id = res.data.content[index].id;
							item.tag = "处理";
							item.tagProps = {
								color: 'blue'
							};
							this.todoDataList.push(res.data.content[index]);
							this.todoList.push(item);
						}
					}
					this.initMessage();
				});
			},
			initRemoveMessage() {
				this.params.status = 2;
				this.getMessageSendData(this.params).then(res => {
					if(res && res.success) {
						this.recyclebinCount = res.data.totalElements;
						this.setCurrentMesType("unread");
					}
				});
			},
			editMessage(status) {
				this.editMessageSend().then(res => {
					if(res && res.success) {
						this.$Message.success("操作成功");
					}
				});
			},
			batchEditMessage(ids) {
				this.batchEditMessageSend(ids, this.params2).then(res => {
					if(res && res.success) {
						this.$Message.success("操作成功");
					}
				});
			},
			deleteMessage(id) {
				this.deleteMessageSend(id).then(res => {
					if(res && res.success) {
						this.$Message.success("删除成功");
					}
				});
			},
			todoClick(index) {
				if(index == undefined) {
					return;
				}
				let query = {};
				let v = this.todoDataList[index]
				query.backRoute = this.$route.name;
				query.title = this.title;
				query.isHistory = true;
				query.procInstId = v.procInstId;
				query.type = v.fcType;
				query.tableId = v.id;
				query.id = v.actTaskId;
				this.$router.push({
					name: 'historic_detail',
					query: query
				});
			},
			messageClick(index) {
				if(index == undefined) {
					return;
				}
				let query = {};
				let v = this.messageDataList[index]
				query.backRoute = this.$route.name;
				query.title = this.title;
				query.isHistory = true;
				query.procInstId = v.procInstId;
				query.type = v.fcType;
				query.tableId = v.id;
				query.id = v.actTaskId;
				this.$router.push({
					name: 'historic_detail',
					query: query
				});
			}

		},
		mounted() {
			//			this.messageList = [...this.messageBaseList];
			//			this.followList = [...this.followBaseList];

			//this.todoList = [...this.todoBaseList];
			this.messageList = [];
			this.followList = [];
			this.messageDataList = [];
			this.todoDataList = [];
			let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
			let levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);

			this.title = levelList[0].meta.title;
			//需完善二级目录  --dengjie
			if(this.title != undefined && this.title != null) {
				this.title = this.title.trim();
			}
			let username = JSON.parse(Cookies.get("userInfo")).nickName;
			if(username.indexOf("退役") > -1) {
				this.title = "退役军人核实";
			} else if(username.indexOf("财政") > -1) {
				this.title = "财政核实";
			} else if(username.indexOf("公安") > -1) {
				this.title = "户籍核实";
			} else if(username.indexOf("网签") > -1) {
				this.title = "网签核实";
			} else if(username.indexOf("人社局") > -1) {
				this.title = "人社核实";
			} else if(username.indexOf("不动") > -1) {
				this.title = "不动产核实";
			}
			else if(username.indexOf("住建(审核)") > -1) {
				this.title = "意见汇总";
				this.searchForm.tnames = "补贴发放"
			}
			this.searchForm.name = this.title;
			this.params2.name = this.title;
			//this.initMessage();
			this.initTotoMessage();
		}
	}
</script>
