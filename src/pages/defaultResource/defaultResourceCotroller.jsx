import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchError, getDefaultResource, updateDefaultResource } from "../../model/event/reducer";
import { useHistory } from "react-router-dom";

import { sagaEventCallBegan } from "../../model/saga";
import { DefaultResource } from "./defaultResource";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type }) => {
  switch (type) {
    case getDefaultResource.type:
      return isDev ? "/defaultResource" : `/getinfodefaultresource`;
    case updateDefaultResource.type:
      return isDev ? "/updateResource" : `/putinfodefaultresource`;
  }
};

export const DefaultResourceCotroller = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [defaultResource, setDefaultResource] = useState("");
  const rsrc = useSelector((state) => state.event.defaultResource);
  const isSuccess = useSelector((state) => state.event.isUpdatedDefaultResource);

  const handleOnChange = useCallback(({ target }) => {
    setDefaultResource(target.value);
  }, []);
  console.log(defaultResource);

  const handleOnSubmit = useCallback(() => {
    dispatch({
      url: getUrl({ type: updateDefaultResource.type }),
      type: sagaEventCallBegan.type,
      method: "put",
      onSuccess: updateDefaultResource.type,
      onError: fetchError.type,
      payload: { defaultResource },
    });
  }, [dispatch, defaultResource]);

  useEffect(() => {
    dispatch({
      url: getUrl({ type: getDefaultResource.type }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getDefaultResource.type,
      onError: fetchError.type,
    });
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      history.push("/admin");
    }
  }, [isSuccess]);

  return (
    <DefaultResource
      rsrc={rsrc}
      defaultResource={defaultResource}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
    />
  );
};
