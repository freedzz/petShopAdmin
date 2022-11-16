import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage'),
    children: [{
      path: 'welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomePage')
    },
    {
      path: 'goods',
      name: 'goods',
      component: () => import('@/views/Goods/GoodsPage')
    },
    {
      path: 'goods/add',
      name: 'goods_add',
      component: () => import('@/views/Goods/GoodsAddPage')
    },
    {
      path: 'nature',
      name: 'nature',
      component: () => import('@/views/Nature/NaturePage')
    },
    {
      path: 'specification/detail',
      name: 'specification_detail',
      component: () => import('@/views/Specification/SpecificationAddPage')
    },
    {
      path: 'category',
      name: 'category',
      component: () => import('@/views/Category/CategoryPage')
    },
    {
      path: 'category/add',
      name: 'category_add',
      component: () => import('@/views/Category/CategoryAddPage')
    },
    {
      path: 'order',
      name: 'order',
      component: () => import('@/views/Order/OrderPage')
    },
    {
      path: 'order/detail',
      name: 'order_detail',
      component: () => import('@/views/Order/OrderDetailPage')
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/User/UserPage')
    },
    {
      path: 'user/add',
      name: 'user_add',
      component: () => import('@/views/User/UserAddPage')
    },
    {
      path: 'shipper',
      name: 'shipper',
      component: () => import('@/views/Shipper/ShipperPage')
    },
    {
      path: 'shipper/list',
      name: 'shipper_list',
      component: () => import('@/views/Shipper/ShipperListPage')
    },
    {
      path: 'shipper/add',
      name: 'shipper_add',
      component: () => import('@/views/Shipper/ShipperAddPage')
    },
    {
      path: 'freight',
      name: 'freight',
      component: () => import('@/views/Freight/FreightPage')
    },
    {
      path: 'except_area',
      name: 'except_area',
      component: () => import('@/views/Freight/ExceptAreaPage')
    },
    {
      path: 'except_area/add',
      name: 'except_area_add',
      component: () => import('@/views/Freight/ExceptAreaAddPage')
    },
    {
      path: 'freight/add',
      name: 'freight_add',
      component: () => import('@/views/Freight/FreightAddPage')
    },
    {
      path: 'notice',
      name: 'notice',
      component: () => import('@/views/Settings/NoticePage')
    },
    {
      path: 'ad',
      name: 'ad',
      component: () => import('@/views/Ad/AdPage')
    },
    {
      path: 'ad/add',
      name: 'ad_add',
      component: () => import('@/views/Ad/AdAddPage')
    },
    {
      path: 'shopcart',
      name: 'shopcart',
      component: () => import('@/views/ShopCart/ShopCartPage')
    },
    {
      path: 'keywords',
      name: 'keywords',
      component: () => import('@/views/Keywords/KeywordsPage')
    },
    {
      path: 'keywords/add',
      name: 'keywords_add',
      component: () => import('@/views/Keywords/KeywordsAddPage')
    },
    {
      path: 'goodsgalleryedit',
      name: 'goodsgalleryedit',
      component: () => import('@/views/GoodsGallery/GoodsGalleryEditPage')
    },
    {
      path: 'admin',
      name: 'admin',
      component: () => import('@/views/Admin/AdminPage')
    },
    {
      path: 'admin/add',
      name: 'admin_add',
      component: () => import('@/views/Admin/AdminAddPage')
    },
    {
      path: 'settings/showset',
      name: 'showset',
      component: () => import('@/views/Showset/ShowSetPage')
    }
    ]
  },
  {
    path: '/wap',
    name: 'wap',
    component: () => import('@/views/WapPage'),
    children: [{
      path: '/',
      name: 'goods',
      component: () => import('@/views/Wap/GoodsPage')
    },
    {
      path: 'order',
      name: 'order',
      component: () => import('@/views/Wap/OrderPage')
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage')
  }, {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || ''
  if (!token && to.name !== 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

Vue.use(VueRouter)

export default router
