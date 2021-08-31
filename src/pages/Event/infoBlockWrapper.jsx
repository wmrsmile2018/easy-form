import React, { useEffect, useState, useMemo } from "react";
import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

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

    axios.get(`${url}/searchSuffixInDB?id=${suffix.id}&&suffix=${suffix.value}`);
  }, [debouncedSearchTerm]);
  // // console.log(suffix, isValid);

  return <InfoBlock isValid={isValid} {...rest} />;
});
