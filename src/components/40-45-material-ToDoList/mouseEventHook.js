import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setShowSearchBar) {
 useEffect(() => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
   if (ref.current && !ref.current.contains(event.target)) {
    console.log("You clicked outside of me!");
    setShowSearchBar(false);
   } else{
    console.log("You clicked inside of me!");
    setShowSearchBar(true);
   }
  }
  // Bind the event listener
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
   // Unbind the event listener on clean up
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props) {
 const { setShowSearchBar } = props;
 const wrapperRef = useRef(null);
 useOutsideAlerter(wrapperRef, setShowSearchBar);

 return <div ref={wrapperRef}>{props.children}</div>;
}