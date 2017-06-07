import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/aggregations';

import { SmartTable } from 'materialized-reactions/SmartTable';
import { LoadingAnimation } from 'materialized-reactions/LoadingAnimation';

import { debug } from '../utils/debug';

function mapStateToProps(state) {
    return {
        data: state.aggregations,
        token: state.auth.token,
        loaded: state.aggregations.loaded,
        isFetching: state.aggregations.isFetching,
        error: state.aggregations.error,
        errorMessage: state.aggregations.data,
        aggregations: state.aggregations.aggregations_list,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AggregationsView extends React.Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const token = this.props.token;
        this.props.fetchAggregations(token);
    }

    render() {

        let Aggregations;

        if (this.props.loaded && this.props.aggregations) {
            const headers = [
                {
                    title: 'Name',
                    width: null,
                },                {
                    title: 'Short name',
                    width: null,
                },                {
                    title: 'DB Fields',
                    width: '30%',
                },                {
                    title: 'Status',
                    width: null,
                },
            ];

            //Adapt Aggregations List
            const aggregations_adapted = this.props.aggregations.map(function( entry, index){
                const db_fields = entry.db_fields.map(function(field, index){
                    const separator = (index==0)? "":", ";
                    return separator + field;
                })

                return (
                    [
                        entry.name,
                        entry.lite,
                        db_fields,
                        entry.status.full,
                    ]
                )
            })

            console.log(aggregations_adapted);

            Aggregations = <SmartTable header={headers} data={aggregations_adapted}/>
        }

        return (
            <div>
                {
                    (!this.props.loaded) ?
                        <LoadingAnimation /> ||
                        this.props.error &&
                            <div>
                                <h1>There was an error</h1>
                                {this.props.errorMessage.message}
                            </div>
                    :
                        <div>
                            <h1>Aggregations</h1>
                            {Aggregations}
                        </div>
                }
                {debug(this.props.data)}
            </div>
        );
    }
}

AggregationsView.propTypes = {
    aggregations: PropTypes.object,
    fetchAggregations: PropTypes.func,
    loaded: PropTypes.bool,
    data: PropTypes.any,
    token: PropTypes.string,
};
