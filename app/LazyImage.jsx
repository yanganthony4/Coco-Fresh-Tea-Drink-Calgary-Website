"use client"

import { useEffect, useRef } from "react"

const LazyImage = ({ src, alt, placeholder = "placeholder.jpg", ...props }) => {
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src
            img.classList.add("loaded")
            observer.unobserve(img)
          }
        })
      })
      observer.observe(img)
    } else {
      // Fallback: load image immediately if Intersection Observer is not supported
      img.src = src
      img.classList.add("loaded")
    }
  }, [src])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={placeholder || "/placeholder.svg"}
      data-src={src || "/placeholder.svg"}
      alt={alt}
      className="lazy-load"
      {...props}
    />
  )
}

export default LazyImage

