import React, { useEffect, useState, useMemo } from "react";
import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";

export const InfoBlockWrapper = React.memo(({ qrs, id, suffix, ...rest }) => {
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const count = qrs.reduce((acc, cur) => {
      if (cur.suffix === suffix.value) return acc + 1;
      return acc;
    }, 0);
    console.log(count, suffix.value);
    if (count > 1) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    // if (debouncedSearchTerm) {
    // }
  }, [debouncedSearchTerm]);
  // // console.log(suffix, isValid);

  return <InfoBlock isValid={isValid} {...rest} />;
});
