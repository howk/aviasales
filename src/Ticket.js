import React from "react";
import Moment from 'react-moment';

const REQUEST_URL_GET_CARRIER_LOGO = 'https://pics.avs.io/99/36/';

export default class Ticket extends React.Component {
  createCarrierLogoUrl(carrier) {
    return `${REQUEST_URL_GET_CARRIER_LOGO}${carrier}.png`;
  }

  formatPrice(price) {
    const priceLocalized = price.toLocaleString('ru-RU', { maximumSignificantDigits: 3});
    return `${priceLocalized} Р`;
  }

  formatStopsLabel(stopsCount) {
    if (stopsCount === 0) return 'Без пересадок';
    if (stopsCount === 1) return '1 пересадка';
    return `${stopsCount} пересадки`;
  }

  formatStopsValue(stops) {
    if (stops.length === 0) return '-';
    return stops.join(', ');
  }

  formatFlightDuration(minutes) {
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh*60;
    return `${hh}ч ${mm}м`;
  }

  render() {
    const { price, carrier, segment1, segment2} = this.props;
    return (
      <div className="content-block flight">
        <header className="flight__header">
          <span className="flight__cost">
            {this.formatPrice(price)}
          </span>
          <span className="flight__carrier">
            <img src={this.createCarrierLogoUrl(carrier)} alt="" />
          </span>
        </header>
        <div className="flight__data">
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              {segment1.origin}-{segment1.destination}
            </div>
            <div className="flight__data__item__content">
              <Moment format="hh:mm">
                {segment1.date}
              </Moment>
              &nbsp;-&nbsp; 
              <Moment format="hh:mm" add={{ minutes: segment1.duration }}>
                {segment1.date}
              </Moment>
            </div>
          </div>
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              В пути
            </div>
            <div className="flight__data__item__content">
              {this.formatFlightDuration(segment1.duration)}
            </div>
          </div>
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              {this.formatStopsLabel(segment1.stops.length)}
            </div>
            <div className="flight__data__item__content">
              {this.formatStopsValue(segment1.stops)}
            </div>
          </div>    
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              {segment2.origin}-{segment2.destination}
            </div>
            <div className="flight__data__item__content">
              <Moment format="hh:mm">
                  {segment2.date}
                </Moment>
                &nbsp;-&nbsp; 
                <Moment format="hh:mm" add={{ minutes: segment2.duration }}>
                  {segment2.date}
                </Moment>
            </div>
          </div>
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              В пути
            </div>
            <div className="flight__data__item__content">
            {this.formatFlightDuration(segment2.duration)}
            </div>
          </div>
          <div className="flight__data__item">
            <div className="flight__data__item__title">
              {this.formatStopsLabel(segment2.stops.length)}
            </div>
            <div className="flight__data__item__content">
              {this.formatStopsValue(segment2.stops)}
            </div>
          </div>                         
        </div>
      </div>      
    );
  }
}
