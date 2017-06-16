import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/orakwlum';

import { socket, socket_connect } from '../../utils/http_functions';

var NotificationSystem = require('react-notification-system');

function mapStateToProps(state) {
    return {
        token: state.auth.token,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class Notification extends Component {
    createNotification = (the_notification) => {
      this.refs.internalNotificationSystem.addNotification(the_notification);
    }

    render() {
      return (
        <div>
          <NotificationSystem ref="internalNotificationSystem" />
        </div>
        );
    }
}



@connect(mapStateToProps, mapDispatchToProps)
export class Connection extends Component {
	componentWillMount() {

        //initialize the connection
        const token = this.props.token;
        socket_connect("token29832382938298asda29");

		const initial=true;

		//listen events!
		socket
			.on('elements.override', (content) => {
				console.debug('[Websocket] Elements to override received');
				this.props.overrideElements(content, initial);
			})

			.on('elements.extend', (content) => {
				console.debug('[Websocket] Elements to extend received');
				this.props.extendElements(content, initial);

                //Create a notification!
                this.refs.notificationSystem.createNotification({
                    message: content.message,
                    level: "success",
                });
			})

			.on('aggregations', (content) => {
				console.debug('[Websocket] Aggregations received');
				this.props.overrideAggregations(content, initial);
			})

			.on('message', (content) => {
				console.debug('[Websocket] Message received');
				this.props.overrideMessage(content, initial);
			});

	}
    render() {
        return <Notification ref="notificationSystem"/>;
    }
}

Connection.propTypes = {
    token: PropTypes.string,
};
