import React from 'react';

export default class Filter extends React.Component {
  renderItems(items, activeItems, clickHandler) {
    const itemsList = items.map(({ name, alias }) => {
      return (
        <li key={alias} className="checklist__item">
          <label className="checklist__item__inner checklist__item_highlitable">
            <span className="checkbox">
              <input
                onChange={(e) => clickHandler(alias, e)}
                className="checkbox__input"
                checked={activeItems.includes(alias)}
                type="checkbox" />
              <span className="checkbox__visual"></span>
            </span>
            <span className="checklist__item__label">{name}</span>
          </label>
        </li>
      );
    });
    return (items.length > 0) ? <ul className="checklist">{itemsList}</ul> : null;
  }

  render() {
    const { title, activeItems, items, clickHandler } = this.props;
    return (
      <div className="content-block filter">
        <div className="content-block__title">{title}</div>
        {this.renderItems(items, activeItems, clickHandler)}
      </div>
    );
  };
}
