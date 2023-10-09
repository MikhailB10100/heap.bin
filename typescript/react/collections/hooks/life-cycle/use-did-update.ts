import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function useDidUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const updateRef = useRef(false)

  useEffect(() => {
    if (updateRef.current) {
      return effect()
    }
    updateRef.current = true
  }, deps)
}
