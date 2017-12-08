import React from 'react';

class TicketData extends React.Component {

	formatDate(d) {


		let dateParts = d.split('.');
		let correctDate = new Date(dateParts[1] + '.' + dateParts[0] + '.' + dateParts[2]);

			
		console.log( correctDate );

		const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    	const days   = ['Вс', 'Пн', 'Вт', 'Ср', 'ЧТ', 'ПТ', 'Сб'];
    	const month  = correctDate.getMonth();
    	const date 	 = correctDate.getDate();
    	const year   = correctDate.getFullYear();
    	const day    = correctDate.getDay();
    	
   			return ( date + " " + months[month] + " " +  year + ", " + days[day] )
	}

	render(){
        
        const stopsLabel = ( this.props.ticketData.stops > 1 ) ? this.props.ticketData.stops + " ПЕРЕСАДКИ" : ( this.props.ticketData.stops === 1 ) ? ("1 ПЕРЕСАДКА") : "";

    		return (
           
			    <div className="ticket ticket__wrapper">
			        <div className="ticket__container">
					            
			            <div className="ticket__content ticket">

			            	<div className="ticket__button-wrapper">

			                	<div className="ticket__header">
			                  		<a className="ticket__airline-logo logo">
										<div className="airline-logos">
					              			<div className="airline-logos__logo">
					                			<img src="./img/turkish.png" alt="Турецкие авиалинии"/>
					              			</div>
					            		</div>
					          		</a>
					        	</div>

					      		<div className="buy-button ticket__buy-button">
                    				<a className="buy-button__link">
                    			    	<button className="buy-button__button">
                    			        	<span className="buy-button__text">Купить<br/>за {this.props.ticketData.price} Р</span>
                    			    	</button>
                    				</a>
                   				</div>

               			  	</div>

				            <div className="ticket__segments segments">
				                <div className="ticket__segment segment">
				                    <div className="segment-route">

				                        <div className="segment-route__origin">
				                            <div className="segment-route__time">{this.props.ticketData.departure_time}</div>
				                            <div className="segment-route__city">{this.props.ticketData.origin}, {this.props.ticketData.origin_name}</div>
				                            <div className="segment-route__date">{this.formatDate(this.props.ticketData.arrival_date)}</div>
				                        </div>

				                        <div className="segment-route__path">

											<div className="segment-route__total-stops">{stopsLabel}</div>

					                            <div className="segment-route__stops --stops-0">
				                                	<div className="segment-route__path-stop --plane --origin">
										        		<div className="segment-route__path-iata"></div>
					                                    <div className="segment-route__iata-dot"></div>
					                        		</div>

					                                <div className="segment-route__path-stop --plane --destination">
					                                	<div className="segment-route__path-iata"></div>
					                                    <div className="segment-route__iata-dot"></div>
													</div>
												</div>

					                            <div className="segment-route__path-line"></div>

					                    </div>

					                    <div className="segment-route__destination">
											<div className="segment-route__time">{this.props.ticketData.arrival_time}</div>
					                   			<div className="segment-route__city">{this.props.ticketData.destination_name}, {this.props.ticketData.destination}</div>
					                   			<div className="segment-route__date">{this.formatDate(this.props.ticketData.arrival_date)}</div>
					                	</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>				
    						
        );
    }
}

export default TicketData;