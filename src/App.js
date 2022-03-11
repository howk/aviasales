import React from 'react';
import axios from 'axios';
import Header from './Header';
import Filter from './Filter';
import BtnGroup from './BtnGroup';
import FlightsCards from './FlightsCards';
import Notification from './Notification';

const REQUEST_URL_GET_SEARCH_ID = 'https://front-test.beta.aviasales.ru/search';
const REQUEST_URL_GET_TICKETS = 'https://front-test.beta.aviasales.ru/tickets';

const filterItems = [
  {alias: 'all', name: 'Все'},
  {alias: 0, name: 'Без пересадок'},
  {alias: 1, name: '1 пересадка'},
  {alias: 2, name: '2 пересадки'},
  {alias: 3, name: '3 пересадки'},
];

const ticketTypeItems = [
  {alias: 'cheapest', name: 'Самый дешевый'},
  {alias: 'fastest', name: 'Самый быстрый'},
  {alias: 'optimal', name: 'Оптимальный'},
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appStatus: 'output',
      filterItemsActive: [],
      ticketType: ticketTypeItems[0].alias,
      ticketsData: {
        tickets: [],
        stop: false,
      },
      searchId: null,
    }
  }

  getSearchId = () => {
    this.setState({
      appStatus: 'pending',
    });    
    return axios.get(REQUEST_URL_GET_SEARCH_ID);
  }

  getTickets = () => {
    this.setState({
      appStatus: 'pending',
    });
    return axios.get(REQUEST_URL_GET_TICKETS, {
      params: {
        searchId: this.state.searchId
      }
    });
  }

  handleTicketTypeClick = (alias) => {
    const { ticketType } = this.state;
    if (alias !== ticketType) this.setState({ticketType: alias});
  }

  handleFilterClick = (alias, event) => {
    let { filterItemsActive } = this.state;
    if (event.target.checked === true) {
      if (alias === 'all') {
        filterItemsActive = ['all'];
      } else {
        filterItemsActive = filterItemsActive.filter((item) => item !== 'all');
        filterItemsActive.push(alias);
      }
    } else {
      filterItemsActive = filterItemsActive.filter((item) => item !== alias);
    }
    this.setState({filterItemsActive});
  }

  componentDidMount() {
    const { searchId } = this.state;
    if (searchId === null) {
      this.getSearchId().then((response) => {
        this.setState({searchId: response.data.searchId});
        return this.getTickets();
      }).then((response) => {
        this.setState({
          appStatus: 'output',
        });        
        this.setState({ticketsData: response.data});
      }).catch((error) => {
        this.setState({
          appStatus: 'error',
        });
        console.log(error);
      });
    }
  }

  render() {
    const { ticketType, filterItemsActive, appStatus  } = this.state;

    return (
      <>
      <Header />
      <div className="main-wrapper">
        <div className="main-layout">
          <aside className="sidebar">
            <Filter
              title="Количество пересадок"
              activeItems={filterItemsActive}
              items={filterItems}
              clickHandler={this.handleFilterClick}
              />
          </aside>
          <div className="content">
            <BtnGroup
              fluid="true"
              namePrefix="ticketType"
              items={ticketTypeItems}
              active={ticketType}
              clickHandler={this.handleTicketTypeClick} />
            <Notification status={appStatus} />
            <FlightsCards status={appStatus} sort={this.state.ticketType} filter={this.state.filterItemsActive} tickets={this.state.ticketsData.tickets} />
          </div>        
        </div>
      </div>
      </>
    );
  }
}
