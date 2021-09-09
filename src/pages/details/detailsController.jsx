import React from "react";
import { Details } from "./details";

export const DetailsController = ({ className }) => {
  return (
    <Details
      event={{
        name: "asadad",
        city: "asdadadad",
        date: "sdsadasd",
        area: "asdasdasdad",
        peopleCount: "sdgsfafsaf",
        qrs: [
          {
            "id": "236",
            "qr_suffix": "troparevo",
            "event_id": "164",
            "people_count": "0",
            "qr_url": "http:localhost/troparevo",
            "team": "true",
            "deleted": "false",
            "qrPath": {
              "id": "141",
              "qr_id": "236",
              "path": "QRs/Поход/troparevo.png",
              "deleted": "false",
            },
            "resources": [
              {
                "id": "374",
                "qr_id": "236",
                "qr_suffix": "troparevo",
                "infinity": "false",
                "url": "https://geekbrains.ru/certificates/688426#",
                "people_count": "0",
                "came_people_count": "0",
                "deleted": "false",
              },
              {
                "id": "375",
                "qr_id": "236",
                "qr_suffix": "troparevo",
                "infinity": "true",
                "url": "https://geekbrains.ru/certificates/681154",
                "people_count": "0",
                "came_people_count": "0",
                "deleted": "false",
              },
            ],
          },
          {
            "id": "237",
            "qr_suffix": "bitcevskiy",
            "event_id": "164",
            "people_count": "0",
            "qr_url": "http:localhost/bitcevskiy",
            "team": "false",
            "deleted": "false",
            "qrPath": {
              "id": "142",
              "qr_id": "237",
              "path": "QRs/Поход/bitcevskiy.png",
              "deleted": "false",
            },
            "resources": [
              {
                "id": "376",
                "qr_id": "237",
                "qr_suffix": "bitcevskiy",
                "infinity": "false",
                "url": "https://geekbrains.ru/certificates/762129",
                "people_count": "0",
                "came_people_count": "0",
                "deleted": "false",
              },
            ],
          },
        ],
      }}
    />
  );
};
