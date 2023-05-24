import { useEffect, useState } from 'react'

function useIntersectionObserver(targetRef) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const updateEntry = ([entry]) => setIsIntersecting(entry.isIntersecting)
 
    // setting the observer on mount
    const observer = new IntersectionObserver(updateEntry)
    targetRef && observer.observe(targetRef)

    return () => observer.disconnect()

  }, [targetRef])

  return isIntersecting;
}

export default useIntersectionObserver