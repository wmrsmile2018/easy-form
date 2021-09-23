import React from "react";
import clsx from "clsx";
import key from "weak-key";

import { Input } from "../input";
import { MarginGroup } from "../marginGroup/marginGroup";
import { Button } from "../button";
import { CheckBox } from "../checkBox";

import { Delete, Edit } from "../../icons/";

import "./infoBlock.scss";

export const InfoBlock = ({
  className,
  onChange,
  onClick,
  onCheck,
  resources,
  checked,
  suffx,
  defRsrc,
  onDelete,
  onDeleteResource,
  isValid,
  onEditResource,
}) => {
  const classes = clsx("info-block", className);
  return (
    <div className={classes}>
      <MarginGroup isColumn gap={20}>
        <MarginGroup gap={30} className="info-block-addNew">
          <MarginGroup gap={5} isColumn>
            <Input
              title="Введите хвост URL"
              type="text"
              name="qr_suffix"
              onChange={onChange}
              value={suffx}
            />
            {!isValid && (
              <p className="invalid-info">
                {`Хвост "${value}"`}
                <br /> уже существует в системе
              </p>
            )}
          </MarginGroup>
          <Button onClick={onClick}>Добавить внешний ресурс</Button>
        </MarginGroup>

        <MarginGroup gap={10} style={{ alignItems: "flex-end" }}>
          <Input
            title="Дефолтный внешний ресурс"
            placeholder="Дефолтный внешний ресурс"
            type="text"
            name="default_resource"
            onChange={onChange}
            value={defRsrc}
            style={{ width: 380 }}
          />
          <i>Оставь пустым если дефолтного внешнего ресурса не будет</i>
        </MarginGroup>
        <CheckBox
          onChange={onCheck}
          name="team"
          checked={checked}
          title="Поставьте галочку, если на этом URL будут команды <br/>
          <i>Пользователи будут поочередно переходить по внешним ресурсам, нрпм имеется 3 внешних ресурса, при переходе 3-х пользователей по QR-коду, на каждом из 3-х внешних ресурсов будет по 1-му пользователю</i>
          "
        />
        <div className="info-block-content">
          <div className="info-block-content-title">
            <p className="info-block__number">№</p>
            <p className="info-block__url">Внешний ресурс</p>
            <p className="info-block__count">Количество человек</p>
          </div>
          <MarginGroup isColumn className="info-block__sources" gap={10}>
            {resources.map((el, i) => (
              <div key={key(el)} className="info-block-source">
                <div>
                  <p className="info-block__number">{i + 1}</p>
                  <a
                    href={el.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-block__url"
                  >
                    {decodeURI(el.url)}
                  </a>
                  <p className="info-block__count">{el.people_count}</p>
                </div>
                <MarginGroup gap={20}>
                  <Edit onClick={() => onEditResource(el.id)} />
                  <Delete onClick={() => onDeleteResource(el.id)} />
                </MarginGroup>
              </div>
            ))}
          </MarginGroup>
        </div>
      </MarginGroup>
      <Delete onClick={onDelete} />
    </div>
  );
};

InfoBlock.propProps = {};

InfoBlock.defaultProps = {};
