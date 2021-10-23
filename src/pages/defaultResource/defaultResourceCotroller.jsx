import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchError, getDefaultResource, updateDefaultResource } from "../../model/event/reducer";

import { sagaEventCallBegan } from "../../model/saga";
import { DefaultResource } from "./defaultResource";

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type }) => {
  switch (type) {
    case getDefaultResource.type:
      return isDev ? "/defaultResource" : `/admin/getinfodefaultresource`;
    case updateDefaultResource.type:
      return isDev ? "/updateResource" : `/admin/putinfodefaultresource`;
  }
};

export const DefaultResourceCotroller = () => {
  const dispatch = useDispatch();
  const [defaultResource, setDefaultResource] = useState("");
  const rsrc = useSelector((state) => state.event.defaultResource);
  const token = useSelector((state) => state.auth.token);
  const handleOnChange = useCallback(({ target }) => {
    setDefaultResource(target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    dispatch({
      url: getUrl({ type: updateDefaultResource.type }),
      type: sagaEventCallBegan.type,
      method: "put",
      onSuccess: updateDefaultResource.type,
      onError: fetchError.type,
      payload: { defaultResource },
      token,
    });
  }, [dispatch, defaultResource]);

  useEffect(() => {
    dispatch({
      url: getUrl({ type: getDefaultResource.type }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getDefaultResource.type,
      onError: fetchError.type,
      token,
    });
  }, [dispatch]);

  return (
    <DefaultResource
      rsrc={rsrc}
      defaultResource={defaultResource}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
    />
  );
};
