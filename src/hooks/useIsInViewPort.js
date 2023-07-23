import React, { useState, useRef, useEffect, cloneElement } from 'react'

const InViewPort = (props) => {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        rootMargin: '100px 0px 100px 0px',
        root: document.querySelector('.rbc-time-content'),
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const cloned = cloneElement(props.children, {
    itemRef: ref,
  })

  if (inView) return cloned
  return <div className={props.className} {...props.groupProps} ref={ref}></div>
}

export default InViewPort
