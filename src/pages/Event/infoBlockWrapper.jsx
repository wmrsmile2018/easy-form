import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";
import { sagaEventCallBegan } from "../../model/event/saga";
import { checkSuffix } from "../../model/event/reducer";

export const InfoBlockWrapper = React.memo(({ qrs, id, suffix, ...rest }) => {
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);

  const isSuffixExist = useSelector((state) => state.event.isSuffixExist);

  useEffect(() => {
    setIsValid(!isSuffixExist);
  }, [isSuffixExist]);

  useEffect(() => {
    const count = qrs.reduce((acc, cur) => {
      if (cur.suffix === suffix.value) return acc + 1;
      return acc;
    }, 0);
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
