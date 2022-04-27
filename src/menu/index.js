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
  { path: '/index', title: 'Dashboard', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' },
      { path: '/page-demo', title: 'new page example' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: 'Dashboard', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' },
      { path: '/page-demo', title: 'new s' }
    ]
  },
  {
    path: '/userMenu', title: 'User Menu'
  },
  {
    path: '/vehicleMenu', title: 'Vehicle Menu'
  },
  {
    path: '/orderMenu', title: 'Order Menu'
  },
  {
    path: '/officeMenu', title: 'Office Menu'
  },
  {
    path: '/vehicleClassMenu', title: 'VehicleClass Menu'
  },
  {
    path: '/couponMenu', title: 'Coupon Menu'
  }
])
