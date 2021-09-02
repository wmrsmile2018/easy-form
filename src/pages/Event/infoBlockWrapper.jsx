import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";
import { sagaEventCallBegan } from "../../model/event/saga";
import { checkSuffix } from "../../model/event/reducer";

const url = process.env.REACT_APP_BASE_URL;

export const InfoBlockWrapper = React.memo(({ qrs, id, suffix, ...rest }) => {
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const count = qrs.reduce((acc, cur) => {
      if (cur.suffix === suffix.value) return acc + 1;
      return acc;
    }, 0);
    // console.log(count, suffix.value);
    if (count > 1) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    dispatch({
      type: sagaEventCallBegan.type,
      url: `/searchSuffixInDB?id=${suffix.id}&&suffix=${suffix.value}`,
      method: "get",
      onSuccess: checkSuffix.type,
    });
  }, [debouncedSearchTerm]);

  return <InfoBlock isValid={isValid} {...rest} />;
});
