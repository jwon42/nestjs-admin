import { EntityMetadata } from 'typeorm'
import * as urls from './utils/urls'

type Route = 'index' | 'changelist' | 'change' | 'add' | 'delete' | 'login' | 'logout'

type RouteArgs = string[]

export function adminUrl(route: Route, ...args: RouteArgs) {
  switch (route) {
    case 'login':
      return urls.loginUrl()
    case 'index':
      return urls.indexUrl()
    case 'changelist':
      return urls.changeListUrl(...(args as [any, any]))
    case 'change':
      return urls.changeUrl(...(args as [any, any, any]))
    case 'add':
      return urls.addUrl(...(args as [any, any]))
    case 'delete':
      return urls.deleteUrl(...(args as [any, any, any]))
    case 'logout':
      return urls.logoutUrl()
    default:
      const guard: never = route
      throw new Error(`Route "${route}" doesn't exist`)
  }
}

export function displayName(entity: object, metadata: EntityMetadata) {
  // @ts-ignore
  if (entity.__proto__.hasOwnProperty('toString')) {
    return entity.toString()
  }
  const primaryColumns = metadata.primaryColumns.map(col => col.getEntityValue(entity))
  return primaryColumns.join(' - ')
}
