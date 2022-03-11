import React from 'react';

export default class Notification extends React.Component {
  generateNotificationText(status) {
    switch (status) {
      case 'pending':
        return 'Загрузка билетов...';
      case 'error':
        return 'Произошла ошибка';
      default:
        return '';
    }
  }

  render() {
    const { status } = this.props;
    return (
      <div className="notification">
        {this.generateNotificationText(status)}
      </div>
    );
  };
}
