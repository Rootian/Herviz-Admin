import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  // { path: '/index', title: 'Dashboard', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' },
  //     { path: '/page-demo', title: 'new page example' }
  //   ]
  // }
])

export const menuAside = supplementPath([
  { path: '/index', title: 'Dashboard', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' },
  //     { path: '/page-demo', title: 'new s' }
  //   ]
  // },
  {
    path: '/userMenu', title: 'User Menu', icon: 'user'
  },
  {
    path: '/vehicleMenu', title: 'Vehicle Menu', icon: 'far fa-car'
  },
  {
    path: '/orderMenu', title: 'Order Menu', icon: 'far fa-cart-arrow-down'
  },
  {
    path: '/officeMenu', title: 'Office Menu', icon: 'far fa-globe'
  },
  {
    path: '/vehicleClassMenu', title: 'VehicleClass Menu', icon: 'far fa-taxi'
  },
  {
    path: '/couponMenu', title: 'Coupon Menu', icon: 'fa-solid fa-dollar'
  }
])
