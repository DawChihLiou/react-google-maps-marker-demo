import { forwardRef, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

// https://github.com/mui/material-ui/blob/6a96f9ca2297c1293cf1c5b96cb0de255d2f4a8a/packages/mui-utils/src/setRef.ts
function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

type PortalProps = PropsWithChildren<{ container: Element | null }>

const Portal = forwardRef<Element, PortalProps>(function Portal(
  { children, container },
  ref
) {
  useEffect(() => {
    setRef(ref, container)

    return () => {
      setRef(ref, null)
    }
  }, [ref, container])

  return container ? createPortal(children, container) : container
})

export default Portal
