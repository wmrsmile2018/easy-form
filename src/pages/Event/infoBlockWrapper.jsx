import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";
import { sagaEventCallBegan } from "../../model/saga";
import { checkSuffix, fetchError } from "../../model/event/reducer";

const isDev = process.env.NODE_ENV === "development";

// const url = isDev ? "/existSuffix" : `/searchSuffixInDB?id=${suffix.id}&&suffix=${suffix.value}`;

const getUrl = ({ suffix, id }) => {
  return isDev ? "/existSuffix" : `/searchSuffixInDB?id=${id}&&suffix=${suffix}`;
};

export const InfoBlockWrapper = ({ qrs, id, suffix, ...rest }) => {
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);

  const isSuffixExist = useSelector((state) => state.event.isSuffixExist);
  // console.log(isSuffixExist);

  useEffect(() => {
    if (isValid) {
      setIsValid(!isSuffixExist);
    } else {
      setIsValid(false);
    }
  }, [isSuffixExist, isValid]);

  useEffect(() => {
    const count = qrs.reduce((acc, cur) => {
      if (cur.suffix === suffix) return acc + 1;
      return acc;
    }, 0);
    if (count > 1) {
      setIsValid(false);
    } else if (isSuffixExist === false) {
      setIsValid(true);
    }

    if (debouncedSearchTerm) {
      dispatch({
        url: `/searchSuffixInDB?id=${id}&&suffix=${suffix}`,
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: checkSuffix.type,
        onError: fetchError.type,
      });
    }
  }, [debouncedSearchTerm, isSuffixExist, qrs]);

  console.log(isValid);
  return <InfoBlock isValid={isValid} {...rest} />;
};