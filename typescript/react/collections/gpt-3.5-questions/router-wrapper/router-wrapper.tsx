import React, { FunctionComponent, useEffect, useState } from 'react'

export interface RouterWrapperRoute {
  path: string
  component: FunctionComponent
}

export interface RouterWrapperProps {
  routes: Array<RouterWrapperRoute>
}

function RouterWrapper({ routes }: RouterWrapperProps) {
  const [Component, setComponent] = useState<FunctionComponent | null>(null)

  useEffect(() => {
    const pathname = window.location.pathname // here should be usage of NavigationContext for handle pathname changes
    let renderComponent: FunctionComponent | null = null
    for (let i = 0; i < routes.length; i++) {
      const { path, component } = routes[i]
      // Check if path has valid length
      if (path.length === 0) {
        throw new Error(`Empty path at index ${i}`)
      }

      // Check if path equals to * and no path matched current location before
      // If truly set provided component as render component
      // It renders only if no paths matches current location in whole array
      if (path === '*' && renderComponent === null) {
        renderComponent = component
        continue
      }

      // Check if current location matches path
      // If it matches set component as renderComponent
      const resolvedPath = path.startsWith('/') ? path : `/${path}`
      const regExpPattern = resolvedPath
        .split('/')
        .map((part) => (part.startsWith(':') ? '[a-zA-Z0-9-_.~]+' : part))
        .join('/')

      const pathRegExp = new RegExp(regExpPattern)
      if (pathRegExp.test(pathname)) {
        renderComponent = component
      }
    }

    if (renderComponent === null) {
      throw new Error(`No routes matches ${pathname}`)
    }

    setComponent(renderComponent)
  }, [routes])

  return Component === null ? <></> : React.createElement(Component)
}

export default RouterWrapper
