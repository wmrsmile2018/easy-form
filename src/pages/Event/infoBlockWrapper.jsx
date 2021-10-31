import React, { useEffect, useState, useMemo } from "react";
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
      return isDev ? "/existSuffix" : `/admin/searchSuffixInDB?id=${id}&&suffix=${suffix}`;
  }
};

export const InfoBlockWrapper = ({ qrs, id, suffix, ...rest }) => {
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(suffix, 1000);
  const [isValid, setIsValid] = useState(true);
  const isSuffixExist = useSelector((state) => state.event.isSuffixExist);
  const token = useSelector((state) => state.auth.token);

  const count = useMemo(
    () =>
      qrs.reduce((acc, cur) => {
        if (cur.qr_suffix === suffix) return acc + 1;
        return acc;
      }, 0),
    [qrs, suffix],
  );

  useEffect(() => {
    if (isValid) {
      setIsValid(!isSuffixExist[suffix]);
    } else {
      setIsValid(false);
    }
  }, [isSuffixExist, isValid, suffix]);

  useEffect(() => {
    if (count > 1) {
      setIsValid(false);
    } else if (count <= 1) {
      const cond = isSuffixExist[suffix] ? false : true;
      setIsValid(cond);
    } else if (!isSuffixExist[suffix]) {
      setIsValid(true);
    }
  }, [isSuffixExist, suffix, count]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const tmpId = id.split("-")[0] === "tmpId" ? "" : id;
      dispatch({
        url: getUrl({ type: checkSuffix.type, state: { id: tmpId, suffix } }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: checkSuffix.type,
        onError: fetchError.type,
        token,
      });
    }
  }, [debouncedSearchTerm, token]);
  return <InfoBlock isValid={isValid} {...rest} />;
};
