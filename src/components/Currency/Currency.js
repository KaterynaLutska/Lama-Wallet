import React from 'react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import GetCurrencyRate from '../../PrivatApi/PrivatApi';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const CURRENCY_EXCHANGE = ['EUR', 'USD', 'RUR'];
const TIME_NORMOLIZE = 60000;

const pad = n => {
  if (n < 10) return '0' + n;
  return n;
};

export default function Currency() {
  const [currency, setCurrency] = useState([]);
  const timeOnLocalstorage = Number(localStorage.getItem('time'));
  const currencyOnLocalstorage = localStorage.getItem('currency');

  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });

  const getCurrency = () => {
    GetCurrencyRate.fetchRates().then(data => {
      setCurrency(data);
      localStorage.setItem('currency', JSON.stringify(data));
    });
    localStorage.setItem('time', JSON.stringify(new Date().valueOf()));
  };

  useEffect(() => {
    if (!currencyOnLocalstorage && !timeOnLocalstorage) {
      getCurrency();
      return;
    }

    if (new Date().valueOf() > timeOnLocalstorage + TIME_NORMOLIZE) {
      getCurrency();
      return;
    }

    if (currencyOnLocalstorage) {
      const parsedLocalStorage = JSON.parse(currencyOnLocalstorage);
      setCurrency(parsedLocalStorage);
      return;
    }

    if (currency.length === 0) {
      setTimeout(() => {
        getCurrency();
      }, 2000);
    }
  }, []);

  return (
    <>
      {!currency ? (
        <div className="loaderContainer">
          <Loader
            type="MutatingDots"
            color="#24cca7"
            secondaryColor="#4a56e2"
            height={120}
            width={120}
            timeout={5000}
          />
        </div>
      ) : (
        <table className="tableCurrency">
          <thead className="tableHead">
            <tr>
              <th className="tableHeaderTitle">Валюта</th>
              <th className="tableHeaderTitle">Покупка</th>
              <th className="tableHeaderTitle">Продажа</th>
            </tr>
          </thead>
          <tbody className="currencyBody">
            {currency.map(item => {
              const buy = pad(Number(item.buy).toFixed(2));
              const sale = pad(Number(item.sale).toFixed(2));

              return CURRENCY_EXCHANGE.map(coint => {
                if (coint === item.ccy) {
                  return (
                    <tr key={item.ccy}>
                      <td className="rowTitle">{item.ccy}</td>
                      <td className="rowTitle second">{buy}</td>
                      <td className="rowTitle third">{sale}</td>
                    </tr>
                  );
                }
              });
            })}
          </tbody>
        </table>
      )}
      {isMobile && (
        <>
          <p className="textCurrency">А вот и курс валют!</p>
          <img
            className="alpacaImg"
            src="https://media1.giphy.com/media/ORjeGbJQP8bSKO9ZrQ/giphy.gif?cid=6c09b952acb22b31766abb3d50bb216699cf2517a7a53b11&rid=giphy.gif&ct=s"
            alt="alpaca"
          />
        </>
      )}
    </>
  );
}
