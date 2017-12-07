import React from 'react';
import FilterItem from './FilterItem';

class StopsFilter extends React.Component {

    render() {

        const ticketData = this.props.ticketData;
        
        var filterItems = this.props.initialStops.map(function (e, i, a) {

            const stopsLabel = (e > 1) ? e + " Пересадки" : (e === 1) ? ("1 Пересадка") : "Без пересадок";      // format stops label
            const cheapestPrice = ticketData.filter( function(ticket){ return ticket.stops === e; } )[0].price; // get cheapest price for each stops count
            const itemId = e;                                                                                   // uniq id for each checkbox
            const checked = this.props.filterItemsChecked[i];                                                   // state for each checkbox

            return (
                
                <FilterItem 
                    uncheckOther={this.props.uncheckOther}
                    onChange={this.props.setStops}
                    cheapestPrice={cheapestPrice}
                    stopsLabel={stopsLabel}
                    checked={checked} 
                    itemId={itemId}
                    key={i}
                />
            )

        }.bind(this)); 

        return (

            <div className="filters__item filter filters">
                <h1 className="filter__header">КОЛИЧЕСТВО ПЕРЕСАДОК</h1>

                <div className="filter__content">
                    <div className="filter__controls checkboxes-list">
                        <div className="checkboxes-list__item">
                            <label className="checkboxes-list__label" htmlFor="stops_all">
                                <span className="checkbox">
                                    <input  type="checkbox" className="checkbox__field" id="stops_all"  
                                            onChange={(event) => this.props.toggleSelectAll(event)} 
                                            checked={this.props.filterItemsAllChecked} 
                                    />
                                    <span className="checkbox__face"></span>
                                </span>
                               Все 
                            </label>
                        </div>
                    </div>
                </div>      

              {filterItems} 

            </div> 
        )
    }
}

export default StopsFilter;