import { useEffect, useState } from "react";

const useMedia = (media: string) => {
  const [match, setMatch] = useState({} as MediaQueryList);

  useEffect(() => {
    function changeMatch() {
      const matches = window.matchMedia(media);
      
      setMatch(matches);
    }

    changeMatch();

    window.addEventListener("resize", changeMatch);

    return () => window.removeEventListener("resize", changeMatch);
  }, [media]);
  return match;
};

export default useMedia;
