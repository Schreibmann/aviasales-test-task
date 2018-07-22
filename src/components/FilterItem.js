import React from "react";

class FilterItem extends React.Component {
  render() {
    return (
      <div className="checkboxes-list__item">
        <label
          className="checkboxes-list__label"
          htmlFor={this.props.itemId}
          onClick={this.props.onClick}
        >
          <span className="checkbox">
            <input
              type="checkbox"
              className="checkbox__field"
              id={this.props.itemId}
              value="on"
              checked={this.props.checked}
              onChange={event => {
                this.props.onChange(event);
              }}
            />
            <span className="checkbox__face" /></span>
          {this.props.stopsLabel}
        </label>
        <div className="checkboxes-list__extra">
          <a
            className="checkboxes-list__extra-uncheck-other"
            onClick={() => this.props.uncheckOther(this.props.itemId)}
          >
            только
          </a>
          <div className="checkboxes-list__extra-content">
            <span className="price --rub">{this.props.cheapestPrice}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterItem;
