import React from 'react';
import classnames from 'classnames';

export default class BtnGroup extends React.Component {
  renderButtons(items, handler, active, name_prefix) {
    return items.map(({ alias, name }) => {
      const classesString = classnames('btn-group__button', {
        'btn-group__button_active': active === alias
      });
      return <button name={name_prefix + '_' + alias} onClick={() => handler(alias)} key={alias} className={classesString}>{name}</button>;
    });
  }

  render() {
    const { fluid, items, clickHandler, active, namePrefix } = this.props;
    const classesString = classnames('btn-group', {
      'btn-group_fluid': fluid
    });
    return (
      <div data-type={active} className={classesString}>
        {this.renderButtons(items, clickHandler, active, namePrefix)}
      </div>
    );
  };
}
