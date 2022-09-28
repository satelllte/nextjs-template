import { useLayoutEffect } from 'react'

export const useResize = (onResize: (ev: UIEvent) => void) => {

	useLayoutEffect(() => {
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

}
