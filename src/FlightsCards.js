import React from "react";
import Ticket from './Ticket';

const TICKETS_DISPLAY_COUNT = 5;
const TICKETS_DISPLAY_COUNT_INCREASE = 5;

export default class FlightsCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showedTicketsCount: TICKETS_DISPLAY_COUNT,
    }
  }

  ticketsFilter(tickets, filter) {
    if (filter[0] !== 'all' && filter.length > 0) {
      const maxStopsCount = Math.max(...filter);
      return tickets.filter(({ segments }) => {
        const segmentStops1 = segments[0].stops;
        const segmentStops2 = segments[1].stops;
        if (segmentStops1.length <= maxStopsCount && segmentStops2.length <= maxStopsCount) return true;
        return false;
      });
    }
    return tickets;
  }

  ticketsSort(tickets, sort) {
    switch (sort) {
      case 'cheapest':
        tickets.sort((ticket1, ticket2) => (ticket1.price - ticket2.price));
        break;
      case 'fastest':
        tickets.sort((ticket1, ticket2) => {
          const ticket1TotalDuration = ticket1.segments[0].duration + ticket1.segments[1].duration;
          const ticket2TotalDuration = ticket2.segments[0].duration + ticket2.segments[1].duration;
          return ticket1TotalDuration - ticket2TotalDuration;
        });
        break;
      default:
        return tickets;
    }
    return tickets;
  }

  renderTickets(tickets, count) {
    const ticketsLimited = tickets.slice(0, count);
    return ticketsLimited.map((ticket, index) => {
      const segment1 = ticket.segments[0];
      const segment2 = ticket.segments[1];
      return (
        <Ticket
          key={index}
          price={ticket.price}
          carrier={ticket.carrier}
          segment1={segment1}
          segment2={segment2}
          />
      );
    });
  }

  handleShowMoreClick = () => {
    const countCurrent = this.state.showedTicketsCount;
    this.setState({showedTicketsCount: countCurrent + TICKETS_DISPLAY_COUNT_INCREASE});
  }

  renderMoreButton() {
    return (
      <button onClick={this.handleShowMoreClick} className="btn btn-primary btn_fluid">Показать еще 5 билетов!</button>
    );
  }

  render() {
    const { filter, tickets, sort, status } = this.props;
    const { showedTicketsCount } = this.state;
    if (tickets.length === 0 && status === 'output') {
      return (
        <div>Не удалось найти билеты с заданными параметрами</div>
      );
    }
    const ticketsFiltered = this.ticketsFilter(tickets, filter);
    const ticketsSorted = this.ticketsSort(ticketsFiltered, sort);
    return (
      <>
      {this.renderTickets(ticketsSorted, showedTicketsCount)}
      {(status === 'output') ? this.renderMoreButton() : null}
      </>
    );
  }
}
