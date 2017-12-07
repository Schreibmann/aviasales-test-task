import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import TicketList from './components/TicketList';
import StopsFilter from './components/StopsFilter';

class App extends Component {

constructor(props) {

    super(props);

      this.state = {
        ticketData: [],
        initialStops: [],
        selectedStops: [],
        filterItemsChecked: [],
        ticketDataFiltered: [],
        filterItemsAllChecked: true
      };

 this.getTicketsData('tickets.json');  
}

getTicketsData(data) {

  $.getJSON( data, function (result) {

      result.tickets.sort( (first, next) => first.price - next.price ); /* sort by price */

      let stops = this.setUniqueStops(result.tickets); 
      let checked = new Array(stops.length).fill(true); // set all filter items to "checked"            

      this.setState({

        ticketData: result.tickets,
        ticketDataFiltered: result.tickets,
        initialStops: stops,
        selectedStops: stops,
        filterItemsChecked: checked
      });

  }.bind(this));
}

setUniqueStops(data) { // all possible stops count in tickets data [0,1,2,3]

  let allStops = data.map( function (val) { // get all stops from all tickets

      return  val.stops;   
  }); 

  allStops.sort( (first, next) => first - next ); 

    const uniqueStops = allStops.filter( (e,i,a) => !i || e !== a[i - 1] ); // remove repeating

    return uniqueStops;
} 

applyFilter(filterVal) { // filter tickets according selected stops [1,2]

    var newData = this.state.ticketData.filter( (obj) => { // tickets with selected stops count  

                return filterVal.indexOf(obj.stops) > -1
    });                
    
    this.setState({ticketDataFiltered: newData});            
}

toggleSelectAll(e) { 

  let arr = this.state.filterItemsChecked.fill(!this.state.filterItemsAllChecked);
  let currentStopsSelection = [];

    if ( this.state.filterItemsAllChecked !== true )  { 

          currentStopsSelection = [0, 1, 2, 3]; 
    }    

  this.setState ({

       filterItemsAllChecked: !this.state.filterItemsAllChecked,
       filterItemsChecked: arr,
       selectedStops: currentStopsSelection
  })

  this.applyFilter( currentStopsSelection );
}

setStops (e){ // applying filter every time user clicks some filter item
               
  const filterItemClicked = parseInt( e.target.id, 10 ); 
  let currentStopsSelection = [];

    if ( this.state.selectedStops.indexOf( filterItemClicked ) > -1 ) { // add or remove values from selectedStops array

          currentStopsSelection = this.state.selectedStops.filter( s => s !== filterItemClicked ); 
    } //remove

        else { 

          currentStopsSelection = [...this.state.selectedStops, filterItemClicked]; 
        }  //add
 
  let newFilterItemsCheckedState = this.state.filterItemsChecked;
  let selectAll = ( this.state.initialStops.length === currentStopsSelection.length ) // check if all filter items checked

  newFilterItemsCheckedState[e.target.id] = !this.state.filterItemsChecked[e.target.id]; // changing state for clicked item
             
  this.setState({ 

    selectedStops: currentStopsSelection.sort(),
    filterItemsAllChecked: selectAll,
    filterItemsChecked: newFilterItemsCheckedState
  }); 

  this.applyFilter( currentStopsSelection.sort() );
}

uncheckOther (checkedItem) {

  let arr = this.state.filterItemsChecked.fill(false); //uncheck all
  arr[checkedItem] = true; // check clicked

  this.setState({ 

       filterItemsChecked: arr,
       filterItemsAllChecked: false,
       selectedStops: [checkedItem]
  }); 

  this.applyFilter( [checkedItem] );
}

resetFilter () {

  this.setState({ 

       filterItemsChecked: [false, false, false, false],
       filterItemsAllChecked: false,
       selectedStops: []
  }); 

  this.applyFilter([]);
};

  render() {

    return (

      <div className="app__inner">

        <div className="app__header">
          <span>
            <img src="./img/logo.png"  alt="Aviasales" />
          </span>
        </div>

        <div className="app__filter">
          <StopsFilter 
            applyFilter={filter => this.applyFilter(filter)} 
            setStops={e => this.setStops(e)} 
            toggleSelectAll={e => this.toggleSelectAll(e)}
            uncheckOther={checkedItem => this.uncheckOther(checkedItem)}
            resetFilter={() => this.resetFilter()}
            initialStops={this.state.initialStops} 
            selectedStops={this.state.selectedStops} 
            ticketData={this.state.ticketData}
            filterItemsAllChecked={this.state.filterItemsAllChecked}
            filterItemsChecked={this.state.filterItemsChecked}
          />
        </div> 

        <div className="app__content">
          <TicketList ticketData={this.state.ticketDataFiltered}/>  
        </div>

      </div>  
    );
  }
}

export default App;
