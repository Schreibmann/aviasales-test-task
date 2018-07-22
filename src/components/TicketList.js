import React from "react";
import TicketData from "./TicketData";

class TicketList extends React.Component {
	render() {
		var TicketItems = this.props.ticketData.map((val, key) => (
			<TicketData ticketData={val} key={key} />
		));

		return <div className="product-list__ticket">{TicketItems}</div>;
	}
}

export default TicketList;
