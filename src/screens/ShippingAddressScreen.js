import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, Button, Icon, Spinner } from 'native-base';
import ShippingAddressList from '../components/ShippingAddressList';
import { shippingAddressesFetch, resetForm } from '../actions/';

class ShippingAddressScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerTitle: 'Shipping Addresses',
			headerRight: (
				<Button 
					onPress={() => {
						params.handleResetForm();
						navigation.navigate('AddShippingAddressScreen');
					}} 
					transparent
				> 
					<Icon name='add' type='Ionicons' />
				</Button>
			),
			headerTitleStyle: {
				color: '#2077be',
			},
		};
	}

	constructor(props) {
		super(props);
		this.willFocus = this.props.navigation.addListener('willFocus', () => {
			this.props.shippingAddressesFetch();
		});
	}

	componentDidMount() {
		this.props.navigation.setParams({
			handleResetForm: this.props.resetForm
		});
	}

	renderListOrActivityIndicator() {
		if (this.props.loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Spinner />
				</View>
				);
		}
		return <ShippingAddressList shippingAddresses={this.props.shipping_addresses} />;
	}

	render() {
		return (
			<Container>
				<Content contentContainerStyle={{ flex: 1 }}>
					<List style={{ flex: 1 }}>
						{this.renderListOrActivityIndicator()}
					</List>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		shipping_addresses: state.shippingAddressForm.shipping_addresses,
		user: state.auth.user,
		jwt: state.auth.jwt,
		loading: state.shippingAddressForm.loading
	};
};

export default connect(mapStateToProps, { shippingAddressesFetch, resetForm })(ShippingAddressScreen);
