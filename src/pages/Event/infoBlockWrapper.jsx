import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { useDebounce } from "../../utils/useHooks";
import { sagaEventCallBegan } from "../../model/saga";
import { checkSuffix, fetchError } from "../../model/event/reducer";

const isDev = process.env.NODE_ENV !== "development";

// const url = isDev ? "/existSuffix" : `/searchSuffixInDB?id=${suffix.id}&&suffix=${suffix.value}`;

// const getUrl = ({ suffix, state: {id, suffix} }) => {
//   return isDev ? "/existSuffix" : `/searchSuffixInDB?id=${id}&&suffix=${suffix}`;
// };

const getUrl = ({ type, state: { id, suffix } }) => {
  switch (type) {
    case checkSuffix.type:
      return isDev ? "/existSuffix" : `/searchSuffixInDB?id=${id}&&suffix=${suffix}`;
  }
};

export const InfoBlockWrapper = ({ qrs, id, suffix, status, ...rest }) => {
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);
  const isSuffixExist = useSelector((state) => state.event.isSuffixExist);
  useEffect(() => {
    if (isValid) {
      setIsValid(!isSuffixExist[suffix]);
    } else {
      setIsValid(false);
    }
  }, [isSuffixExist, isValid]);

  useEffect(() => {
    const count = qrs.reduce((acc, cur) => {
      if (cur.qr_suffix === suffix) return acc + 1;
      return acc;
    }, 0);
    console.log(count);
    if (count > 1) {
      console.log("hello");
      setIsValid(false);
    } else if (isSuffixExist[suffix] === false) {
      setIsValid(true);
    }
    console.log(qrs);
  }, [isSuffixExist, suffix, qrs]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // console.log(suffix);
      const tmpId = id.split("-")[0] === "tmpId" ? "" : id;
      dispatch({
        url: getUrl({ type: checkSuffix.type, state: { id: tmpId, suffix } }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: checkSuffix.type,
        onError: fetchError.type,
      });
    }
  }, [debouncedSearchTerm]);
  return <InfoBlock isValid={isValid} {...rest} />;
};
