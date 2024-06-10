import React, { Component } from 'react';

export default class PaymentOptionBase extends Component {
	constructor(props) {
		super(props);
		this.state = { paymentOption: 'Credit Card', selectedOption: '3 months' };
	}
	chanePaymentOption = (op) => {
		this.setState({ paymentOption: op });
	};
	onContinue = () => {};
	onChoosePlan = (item) => {
		this.setState({ selectedOption: item });
	};
}
