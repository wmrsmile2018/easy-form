import React from "react";
import clsx from "clsx";
import key from "weak-key";

import { Input } from "../input";
import { MarginGroup } from "../marginGroup/marginGroup";
import { Button } from "../button";
import { CheckBox } from "../checkBox";

import { Delete, Edit } from "../../icons/";

import "./infoBlock.scss";

const checkboxFields = [
  { name: "personal_access", title: "Персональный пароль" },
  { name: "group_access", title: "Групповой пароль" },
];

const personalAccessFields = [
  { name: "personal_access_template", title: "Шаблон пароля" },
  { name: "personal_access_length", title: "Количество символов" },
  { name: "personal_access_quantity", title: "Количество попыток" },
  { name: "personal_access_count", title: "Количество паролей" },
];

export const InfoBlock = ({
  className,
  onChangeSuffix,
  onChangeDefRsrc,
  onClick,
  onCheck,
  resources,
  checked,
  suffix,
  defRsrc,
  onDelete,
  onDeleteResource,
  isValid,
  onEditResource,
  onChangePassword,
  onChangeCheckedPassword,
  handleOnChangeResources,
  handleOnCheckCommand,
  ...rest
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
              onChange={onChangeSuffix}
              value={suffix || ""}
            />
            {!isValid && (
              <p className="invalid-info">
                {`Хвост "${suffix}"`}
                <br /> уже существует в системе
              </p>
            )}
          </MarginGroup>
          <Button onClick={onClick}>Добавить внешний ресурс</Button>
        </MarginGroup>

        <MarginGroup gap={10} className="event__access" isColumn>
          <h2>Доступы</h2>
          <MarginGroup gap={15}>
            {checkboxFields.map((el) => (
              <CheckBox
                key={el.name}
                title={el.title}
                name={el.name}
                onChange={onChangeCheckedPassword}
                checked={rest[el.name]}
              />
            ))}
          </MarginGroup>
        </MarginGroup>
        {(rest.personal_access || rest.group_access) && (
          <MarginGroup gap={10} isColumn className="event__access-fields">
            {rest.group_access && (
              <>
                <h2>Групповой пароль</h2>
                <Input
                  name={"group_password"}
                  title={"Групповой пароль"}
                  onChange={onChangePassword}
                  value={rest.group_password}
                />
              </>
            )}
            {rest.personal_access && (
              <>
                <h2>Персональный пароль</h2>
                <MarginGroup gap={5}>
                  {personalAccessFields.slice(0, 2).map((el) => (
                    <Input
                      key={key(el)}
                      name={el.name}
                      title={el.title}
                      onChange={onChangePassword}
                      value={rest[el.name]}
                    />
                  ))}
                </MarginGroup>
                <MarginGroup gap={5}>
                  {personalAccessFields.slice(2).map((el) => (
                    <Input
                      key={key(el)}
                      name={el.name}
                      title={el.title}
                      onChange={onChangePassword}
                      value={rest[el.name]}
                    />
                  ))}
                </MarginGroup>
              </>
            )}
          </MarginGroup>
        )}

        <MarginGroup gap={10} style={{ alignItems: "flex-end" }}>
          <Input
            title="Дефолтный внешний ресурс"
            type="text"
            name="default_resource"
            onChange={onChangeDefRsrc}
            value={defRsrc || ""}
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
            <p className="info-block__type">Командный</p>
            <p className="info-block__url">Внешний ресурс</p>
            <p className="info-block__count">Количество человек</p>
            <p className="info-block__name">Название страницы</p>
          </div>
          <MarginGroup isColumn className="info-block__sources" gap={10}>
            {resources.map((el) => {
              return (
                <MarginGroup gap={15} key={el.id} className="info-block-source-wrapper">
                  <div className="info-block-source">
                    <div>
                      <p className="info-block__number">{el.number}</p>
                      <CheckBox
                        className={"info-block__type"}
                        name={"isCommand"}
                        onChange={(e) => handleOnCheckCommand(el.id, e)}
                        checked={!!el.isCommand}
                      />
                      <a
                        href={el.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-block__url"
                      >
                        {decodeURI(el.url)}
                      </a>
                      <p className="info-block__count">{el.people_count}</p>
                      <p className="info-block__name">{el.name}</p>
                    </div>
                    <MarginGroup gap={20}>
                      <Edit onClick={() => onEditResource(el.id)} />
                      <Delete onClick={() => onDeleteResource(el.id)} />
                    </MarginGroup>
                  </div>
                  {decodeURI(el.url).includes("qrga.me/b/") && (
                    <MarginGroup className="info-block_additional_text">
                      <Input
                        name="additional_text"
                        type="text"
                        name="default_resource"
                        onChange={(e) => handleOnChangeResources(el.id, e)}
                        style={{ width: 200 }}
                        value={el["additional_text"]}
                        title={"Сообщение"}
                      />
                      <Button style={{ height: 35, width: 35 }}>+</Button>
                    </MarginGroup>
                  )}
                </MarginGroup>
              );
            })}
          </MarginGroup>
        </div>
      </MarginGroup>
      <Delete onClick={onDelete} />
    </div>
  );
};

InfoBlock.propProps = {};

InfoBlock.defaultProps = {};
