import Vue from 'vue'
import Router from 'vue-router'
import {TokenService} from '../services/storage.service'
import i18n from "../lang/lang";
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Page403 = () => import('@/views/pages/Page403')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const InvoiceList = () => import('@/views/invoice/InvoiceList')
const InvoiceCreateOrUpdate = () => import('@/views/invoice/InvoiceCreateOrUpdate')
const DocumentDetails = () => import('@/views/invoice/DocumentDetails')
const Sign = () => import('@/views/invoice/Sign')


// Organization
const OrgUserAddOrUpdate = () => import('@/views/organization/users/OrgUserAddOrUpdate')
const OrgUserList = () => import('@/views/organization/users/OrgUserList')
const CreateOrUpdateContract = () => import('@/views/organization/contracts/createOrUpdateContract');
const ContractList = () => import('@/views/organization/contracts/index');

// Contractor
const CreateOrUpdateContractor = () => import('@/views/contractors/createOrUpdateContractor');
const ContractorList = () => import('@/views/contractors/index');



//Admin
const Roles = () => import('@/views/admin/roles/roles');
const CreateOrUpdateRole = () => import('@/views/admin/roles/createOrUpdate');
const Positions = () => import('@/views/admin/position/index');
const Bank = () => import('@/views/admin/bank/index');
const CreateOrUpdateBank = () => import('@/views/admin/bank/createOrUpdateBank');

// Invoice Act

const InvoiceActList = () => import('@/views/invoiceact/InvoiceActList');
const InvoiceActCreateOrUpdate = () => import('@/views/invoiceact/InvoiceActCreateOrUpdate');
const InvoiceActDetails = () => import('@/views/invoiceact/InvoiceActDetails');

// Warrant Act

const WarrantList = () => import('@/views/warrant/WarrantList');
const WarrantCreateOrUpdate = () => import('@/views/warrant/WarrantCreateOrUpdate');
const WarrantDetails = () => import('@/views/warrant/WarrantDetails');

//Profile

const Profile  = () => import('@/views/profile/index');

// Goods

const GoodsList = () => import('@/views/goods/GoodsList');
const GoodsCreateOrUpdate  = () => import('@/views/goods/GoodsCreateOrUpdate');
Vue.use(Router);


const routes = [
	{
		path: '/',
		redirect: '/dashboard',
		name: i18n.t('Dashboard',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'dashboard',
				name: i18n.t('Dashboard',TokenService.getLocale()),
				component: Dashboard,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/organization',
		redirect: '/organization/user/list',
		name: i18n.t('Organization',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'user/list',
				name: i18n.t('User list',TokenService.getLocale()),
				component: OrgUserList,
				meta: {
					public: false,
				}
			},
			{
				path: 'user/create',
				name: i18n.t('Create New User',TokenService.getLocale()),
				component: OrgUserAddOrUpdate,
				meta: {
					public: false,
				}

			},
			{
				path: 'user/update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: OrgUserAddOrUpdate,
				meta: {
					public: false,
				}

			},
			{
				path: 'settings',
				name: i18n.t('Org_settings',TokenService.getLocale()),
				component: Profile,
				meta: {
					public: false,
				}
			},
		]

	},
	{
		path: '/contract',
		redirect: '/contract/list',
		name: i18n.t('goods.title',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'list',
				name: i18n.t('Contracts',TokenService.getLocale()),
				component: ContractList,
				meta: {
					public: false,
				}
			},
			{
				path: 'new',
				name: i18n.t('Contract',TokenService.getLocale()),
				component: CreateOrUpdateContract,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: CreateOrUpdateContract,
				meta: {
					public: false,
				}
			},
		]
	},

	{
		path: '/goods',
		redirect: '/goods/list',
		name: i18n.t('goods.title',TokenService.getLocale()),
		component: TheContainer,
		children: [

			{
				path: 'list',
				name: i18n.t('goods.list',TokenService.getLocale()),
				component: GoodsList,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: GoodsCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'create',
				name: i18n.t('actions.create',TokenService.getLocale()),
				component: GoodsCreateOrUpdate,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/contractor',
		redirect: '/contractor/list',
		name: i18n.t('Contractor',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'create',
				name: i18n.t('actions.create',TokenService.getLocale()),
				component: CreateOrUpdateContractor,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: CreateOrUpdateContractor,
				meta: {
					public: false,
				}
			},
			{
				path: 'list',
				name: i18n.t('actions.list',TokenService.getLocale()),
				component: ContractorList,
				meta: {
					public: false,
				}
			}

		]
	},
	{
		path: '/profile',
		redirect: '/dashboard',
		name: i18n.t('actions.profile',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: '/',
				component: Profile,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/invoiceact',
		redirect: '/invoiceact/list',
		name: i18n.t('invoiceact.title',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'list',
				component: InvoiceActList,
				meta: {
					public: false,
				}
			},
			{
				path: 'create',
				name: i18n.t('invoice.create',TokenService.getLocale()),
				component: InvoiceActCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'copy/:copyid',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: InvoiceActCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'details/:id',
				name: i18n.t('Details',TokenService.getLocale()),
				component: InvoiceActDetails,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: InvoiceActCreateOrUpdate,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/warrant',
		redirect: '/warrant/list',
		name: i18n.t('warrant.title',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'list',
				component: WarrantList,
				meta: {
					public: false,
				}
			},
			{
				path: 'create',
				name: i18n.t('invoice.create',TokenService.getLocale()),
				component: WarrantCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'copy/:copyid',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: WarrantCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'details/:id',
				name: i18n.t('Details',TokenService.getLocale()),
				component: WarrantDetails,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: WarrantCreateOrUpdate,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/invoice',
		redirect: '/invoice/list',
		name: i18n.t('Invoice',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'list',
				name: i18n.t('invoice.list',TokenService.getLocale()),
				component: InvoiceList,
				meta: {
					public: false,
				}
			},
			{
				path: 'create',
				name: i18n.t('invoice.create',TokenService.getLocale()),
				component: InvoiceCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: InvoiceCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'copy/:copyid',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: InvoiceCreateOrUpdate,
				meta: {
					public: false,
				}
			},
			{
				path: 'details/:id',
				name: i18n.t('Details',TokenService.getLocale()),
				component: DocumentDetails,
				meta: {
					public: false,
				}
			},
			{
				path: 'sign/:id',
				name: i18n.t('Sign',TokenService.getLocale()),
				component: Sign,
				meta: {
					public: false,
				}
			},
		]
	},
	{
		path: '/admin',
		redirect: '/admin/roles',
		name: i18n.t('admin.title',TokenService.getLocale()),
		component: TheContainer,
		children: [
			{
				path: 'roles',
				name: i18n.t('role.list',TokenService.getLocale()),
				component: Roles,
				meta: {
					public: false,
				}
			},
			{
				path: 'role/update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: CreateOrUpdateRole,
				meta: {
					public: false,
				}
			},
			{
				path: 'role/create',
				name: i18n.t('role.create',TokenService.getLocale()),
				component: CreateOrUpdateRole,
				meta: {
					public: false,
				}
			},
			{
				path: 'positions',
				name: i18n.t('Positions',TokenService.getLocale()),
				component: Positions,
				meta: {
					public: false,
				}
			},
			{
				path: 'bank',
				name: i18n.t('bank.list',TokenService.getLocale()),
				component: Bank,
				meta: {
					public: false,
				}
			},
			{
				path: 'bank/create',
				name: i18n.t('role.create',TokenService.getLocale()),
				component: CreateOrUpdateBank,
				meta: {
					public: false,
				}
			},
			{
				path: 'bank/update/:id',
				name: i18n.t('actions.change',TokenService.getLocale()),
				component: CreateOrUpdateBank,
				meta: {
					public: false,
				}
			},

		]
	},

	{
		path: '/error/404',
		name: 'Page404',
		component: Page404
	},
	{
		path: '/error/500',
		name: 'Page500',
		component: Page500
	},
	{
		path: '/error/403',
		name: 'Page403',
		component: Page403
	},
	{
		path: '/user',
		redirect: '/dashboard',
		name: 'User',
		component: {
			render(c) {
				return c('router-view')
			}
		},
		children: [

			{
				path: 'login',
				name: 'Login',
				component: Login,
				meta: {
					public: true, // allow even if not logged in
					onlyWhenLoggedOut: true
				}
			},
			{
				path: 'signup',
				name: 'signup',
				component: Register,
				meta: {
					public: true, // allow even if not logged in
					onlyWhenLoggedOut: true
				}
			}
		]
	},

];
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	scrollBehavior: () => ({y: 0}),
	routes
});
// GLOBAL ROUTER BEFOREEACH GUARD
router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public)
	const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
	const loggedIn = !!TokenService.getToken();
	if (!isPublic && !loggedIn && to.name !== 'signup') {
		return next({
			path: '/user/login',
			query: {redirect: to.fullPath === '/pages/login' ? '/dashboard' : to.fullPath}  // Store the full path to redirect the user to after login
		});
	}
	// if(to.path.split("/")[1] !== 'dashboard' && to.path.split("/")[1] !== 'error'){
	// 	let path = to.path.split("/")[1];
	// 	let perm = path.charAt(0).toUpperCase() + path.slice(1) + 'View';
	// 	if(!ability.can(perm,'permissions')){
	// 		return next('/error/403')
	// 	}
	// }
	// Do not allow user to visit login page or register page if they are logged in
	if (loggedIn && onlyWhenLoggedOut) {
		return next('/dashboard')
	}

	next()
});

export default router

