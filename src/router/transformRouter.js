import layout from '@/views/layout'

function translateMenus (d, basePath, index = 0) {
  const name = d.menuKey
  const path = `${basePath}/${name}`
  index += 1
  if (d.children && d.children.length) {
    const redirect = d.children[0].menuKey
    return {
      name,
      path,
      component: index === 1 ? layout : (d.isRoute ? () => import(`@/views/${redirect}`) : undefined),
      redirect: {
        name: redirect
      },
      mata: { title: d.name, icon: d.menuKey, keepAlive: false },
      children: d.children.map(child => translateMenus(child, path, index))
    }
  } else {
    return {
      name,
      path,
      component: index === 1 ? layout : (d.isRoute ? () => import(`@/views/${d.menuKey}`) : undefined),
      mata: { title: d.name, icon: d.menuKey, keepAlive: false }
    }
  }
}

export default function menutoRoutes (data) {
  return data.map(item => translateMenus(item, ''))
}
