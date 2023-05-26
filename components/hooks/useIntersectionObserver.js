import { useEffect, useState } from 'react'

/**
 * Setups the intersection observer
 * @param {*} targetRef - this is the trigger for the infinite scroller, the observed DOM node
 * @param {*} done - A flag to disconnect the observer if there are no more results to load. Avoid removing the observed DOM node (to preserve ref) as we need
 *                    to connect again if after not having results we do have more (for ex, user filters -> load all filtered results -> remove filters -> now there are more results and we need to re-connect the observer)
 * @returns 
 */
function useIntersectionObserver(targetRef, done) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const updateEntry = ([entry]) => setIsIntersecting(entry.isIntersecting)

    // setting the observer on mount
    let observer;

    if (targetRef && !done) {
      observer = new IntersectionObserver(updateEntry)
      observer.observe(targetRef)
    }

    return () => {
      observer && observer.disconnect()
    }

  }, [targetRef, done])

  return isIntersecting;
}

export default useIntersectionObserver