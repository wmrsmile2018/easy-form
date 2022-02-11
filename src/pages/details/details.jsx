import React, { useReducer, useMemo, useCallback, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
// import domtoimage from "dom-to-image";

import QRCode from "react-qr-code";

import "./details.scss";

import { Title } from "../../components/title";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Button } from "../../components/button";

const ROW_HEIGHT = 51;
// const file = new Blob([<div>hello my dear</div>], { type: "text/plain" });
// const downloadLink = window.URL.createObjectURL(file);

const Resources = React.memo(
  ({ className, resources, genDefaultRsrc, defaultResource, defaultResourceCount }) => {
    const classes = clsx("resources", className);

    return (
      <div classes={classes}>
        <div className="resources-header">
          <span className="row__cell header__row-cell row__index">№</span>
          <span className="row__cell header__row-cell row__url">Внешние ресурсы</span>
          <span className="row__cell header__row-cell row__scheduled">
            Запланированное количество человек
          </span>
          <span className="row__cell header__row-cell row__team">
            Перешедшее количество человек
          </span>
        </div>
        <div className="resources-content">
          {resources.map((el, i) => (
            <div className="row-cells" key={key(el)}>
              <span className="row__cell row__index">{i + 1}</span>
              <a
                href={decodeURI(el.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="row__cell row__url"
              >
                {decodeURI(el.url)}
              </a>
              <span className="row__cell row__scheduled">
                {el.people_count !== "0" ? el.people_count : "Бесконечное"}
              </span>
              <span className="row__cell row__team">{el.came_people_count}</span>
            </div>
          ))}
          {genDefaultRsrc > 0 && (
            <div className="row-cells">
              <span className="row__cell row__index">{resources.length + 1}</span>
              <span className="row__cell row__url">Общий дефолтный внешний ресурс</span>
              <span className="row__cell row__scheduled">0</span>
              <span className="row__cell row__team">{genDefaultRsrc}</span>
            </div>
          )}
          {defaultResource && (
            <div className="row-cells">
              <span className="row__cell row__index">
                {resources.length + 1 + !!genDefaultRsrc}
              </span>
              <a
                href={decodeURI(defaultResource)}
                target="_blank"
                rel="noopener noreferrer"
                className="row__cell row__url"
              >
                {decodeURI(defaultResource)}
              </a>
              <span className="row__cell row__scheduled">0 (Дефолтный внешний ресурс)</span>
              <span className="row__cell row__team">{defaultResourceCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

const Row = React.memo(
  ({
    id,
    className,
    qrUrl,
    peopleCount,
    team,
    index,
    rsrcCount,
    resources,
    qrPath,
    genDefaultRsrc,
    defaultResource,
    defaultResourceCount,
  }) => {
    const [toggle, dispatch] = useReducer((state) => !state, true);
    const ref = useRef(null);
    const classes = clsx("row", className, { showDetails: toggle });

    const height = useMemo(() => {
      let rowCount = genDefaultRsrc > 0 ? resources.length + 2 : resources.length + 1;
      rowCount = defaultResource ? rowCount + 1 : rowCount;
      return toggle ? rowCount * ROW_HEIGHT : 0;
    }, [toggle, genDefaultRsrc]);

    const handleOnClick = useCallback(
      ({ ref }) => {
        if (!ref.current) {
          return null;
        }

        toPng(ref.current).then((dataUrl) => {
          window.saveAs(dataUrl, "someFile.png");
        });
        // .catch((err) => {
        //   console.log(err);
        // });
      },
      [ref],
    );

    const handleOnClickAccess = useCallback(() => {
      window.open(`http://qrga.me:80/admin/getpasswords?id=${id}`, "_blank");
    });

    return (
      <div className={classes}>
        <div className="row-cells__wrapper" onClick={dispatch}>
          <div className="row-cells">
            <span className="row__cell row__index">{index + 1}</span>
            <span className="row__cell row__url">{qrUrl}</span>
            <span className="row__cell row__team">{team ? "Да" : "Нет"}</span>
            <span className="row__cell row__people-count">{peopleCount}</span>
            <span className="row__cell row__rsrc-count">{rsrcCount}</span>
            <MarginGroup className="row-qr-path row__cell" isColumn gap={20}>
              <div className="row-qr" ref={ref}>
                <QRCode className="row__qr-path" title="hello" size={200} value={qrUrl} />
                <p>{qrUrl.split("://")[1]}</p>
              </div>
              <Button onClick={handleOnClickAccess}>Доступы</Button>
              <Button onClick={() => handleOnClick({ href: qrPath, name: "qr-code", ref })}>
                Скачать Qr код
              </Button>
            </MarginGroup>
          </div>
        </div>
        <div className="row-resources" style={{ height }}>
          <Resources
            resources={resources}
            genDefaultRsrc={genDefaultRsrc}
            defaultResource={defaultResource}
            defaultResourceCount={defaultResourceCount}
          />
        </div>
      </div>
    );
  },
);

export const Details = React.memo(
  ({
    className,
    event,
    setZero,
    handleStatisticStart,
    handleStatisticUpdate,
    handleStatisticStop,
  }) => {
    const {
      name,
      city,
      date,
      area,
      people_count,
      qrs,
      general_default_resource_people_count,
      default_resource_people_count,
      deleted,
      id,

      statisticStart,
    } = event;
    const history = useHistory();
    const classes = clsx("details", className, { deleted: deleted });

    const handleOnClick = useCallback(() => {
      history.push(`/admin/edit-event/${id}`);
    }, [id]);

    return (
      <div className={classes}>
        <Title>Информация о мероприятии</Title>

        <MarginGroup isColumn gap={20}>
          <MarginGroup className={"details-header-group"} gap={50}>
            <MarginGroup gap={40}>
              <MarginGroup className="details-header" isColumn gap={5}>
                <p>
                  Наименование мероприятия:<span>{name}</span>
                </p>
                <p className="details-status">
                  Стаус:
                  <span>
                    <i>
                      {deleted
                        ? "Мероприятие удалено, QR-код будет вести на общий дефолтный внешний ресурс"
                        : "Мероприятие активно"}
                    </i>
                  </span>
                </p>
                <p>
                  Город:<span>{city}</span>
                </p>
                <p>
                  Дата:<span>{date}</span>
                </p>
                <p>
                  Место:<span>{area}</span>
                </p>
                <p>
                  Перешло людей:<span>{people_count}</span>
                </p>
                <p>
                  Перешло на дефолтные внешние ресурсы:
                  <span>{default_resource_people_count}</span>
                </p>
                <p>
                  Перешло на общий дефолтный внешний ресурс:
                  <span>{general_default_resource_people_count}</span>
                </p>
              </MarginGroup>
              <MarginGroup isColumn style={{ justifyContent: "space-between" }}>
                <MarginGroup gap={10} isColumn>
                  {!deleted && (
                    <>
                      <MarginGroup gap={5}>
                        <Button
                          disabled={statisticStart === true}
                          data-id={id}
                          onClick={handleStatisticStart}
                          color={"blue"}
                        >
                          Нажать перед мероприятием для сбора статистики
                        </Button>
                        <Button
                          disabled={statisticStart === false}
                          data-id={id}
                          onClick={handleStatisticUpdate}
                          color={"yellow"}
                        >
                          Обновить статистику
                        </Button>
                        <Button
                          disabled={statisticStart === false}
                          data-id={id}
                          onClick={handleStatisticStop}
                          color={"red"}
                        >
                          Остановить сбор статистики
                        </Button>
                      </MarginGroup>
                      <>
                        {statisticStart ? (
                          <p style={{ color: "#ed1414", fontSize: 24 }}>
                            Идёт мероприятие. Можешь обновить статистику в реальном времени.
                            Остановить сброс статистики можно ТОЛЬКО ПО ОКОНЧАНИИ МЕРОПРИЯТИЯ
                          </p>
                        ) : (
                          <p style={{ color: "#12158d", fontSize: 24 }}>
                            Мероприятие не идет. Не забудь обнулить кол-во пришедших пользователей и
                            нажать СИНЮЮ КНОПКУ ПЕРЕД НАЧАЛОМ МЕРОПРИЯТИЯ.
                          </p>
                        )}
                      </>
                    </>
                  )}
                </MarginGroup>
                <MarginGroup gap={20}>
                  <Button disabled={statisticStart === true} onClick={setZero}>
                    Обнулить кол-во пришедших пользователей
                  </Button>
                  <Button onClick={handleOnClick}>Изменить </Button>
                </MarginGroup>
              </MarginGroup>
            </MarginGroup>
          </MarginGroup>

          <div className="details-table">
            <div className="details-table-header">
              <span className="row__cell header__row-cell row__index">№</span>
              <span className="row__cell header__row-cell row__url">Url QR кода</span>
              <span className="row__cell header__row-cell row__team">Командный QR</span>
              <span className="row__cell header__row-cell row__people-count">Перешло людей</span>
              <span className="row__cell header__row-cell row__rsrc-count">
                Количество внешних ресурсов
              </span>
              <span className="row__cell header__row-cell row__qr-path">Qr код</span>
            </div>
            <div className="details-table-content">
              {qrs.map((el, i) => (
                <Row
                  key={key(el)}
                  index={i}
                  id={el.id}
                  qrUrl={el.qr_url}
                  peopleCount={el.people_count}
                  team={el.teamForFront}
                  rsrcCount={el.resources.length}
                  resources={el.resources}
                  qrPath={el.qrPath}
                  genDefaultRsrc={el.general_default_resource_people_count}
                  defaultResource={el.default_resource}
                  defaultResourceCount={el.default_resource_people_count}
                />
              ))}
            </div>
          </div>
        </MarginGroup>
      </div>
    );
  },
);
