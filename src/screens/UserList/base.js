import { Component } from 'react';

const LIMIT = 10

const onChangeText = function (value) {
	this.setState({ search: value });
};

const toggleModal = function () {
	this.setState({
		isModalVisible: !this.state.isModalVisible,
		barStyle: this.state.isModalVisible ? 'light-content' : 'dark-content'
	});
};

const setValue = function (type) {
	return (value) => {
		this.setState({ filters: { ...this.state.filters, [type]: value }, applied: {...this.state.applied, [type]: true} })
	}

}

const setRange = function ([from_age, to_age]) {
	this.setState({ filters: { ...this.state.filters, from_age, to_age}, applied: { ...this.state.applied, ["age"]: true} });
	console.log('\n\n',this.state.applied)
}
export default class UserListBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			applied: {},
			isModalVisible: false,
			barStyle: 'dark-content',
			filters: {},
			propsFilters: {}
		};
		this.onChangeText = onChangeText.bind(this);
		this.toggleModal = toggleModal.bind(this);
		this.setValue = setValue.bind(this)
		this.setRange = setRange.bind(this)
		this._renderFooter = this._renderFooter.bind(this)
	}

	static getDerivedStateFromProps(props, state) {
		if (state.propsFilters !== props.filters) {
			let { type, kind } = props.navigation.state.params;
			props.dispatch({ type: 'MATCHES', payload: {} })
			props.getMatches({ type, kind, offset: 0, limit: LIMIT, access_token: props.access_token, filters: props.filters, clean: true });
			return { propsFilters: props.filters, state, filters: props.filters }
		}
		return null
	}

	navigateToUserProfile = (index) => {
		this.props.navigation.navigate('Profile', { index, detail: this.props.matches[index] });
	};

	componentDidMount() {
		// let { type, kind } = this.props.navigation.state.params;
		// this.props.getFilters(this.props.access_token);
		// this.props.getMatches({ type, kind, offset: 0, limit: LIMIT, access_token: this.props.access_token, filters: this.props.filters });
		this.props.navigation.setParams({ toggleModal: this.toggleModal });
	}
}
