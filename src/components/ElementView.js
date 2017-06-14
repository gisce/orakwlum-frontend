import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/orakwlum';
import { debug } from '../utils/debug';

import { Proposal } from './Proposal';
import { LoadingAnimation } from 'materialized-reactions/LoadingAnimation';

function mapStateToProps(state) {
    return {
        token: state.auth.token,

        loaded: state.orakwlum.loaded,
        isFetching: state.orakwlum.isFetching,

        elements: state.orakwlum.elements,
        aggregations: state.orakwlum.aggregations,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ElementView extends React.Component {
    componentDidMount() {
        this.fetchData();
        //this.elementID = this.props.params.elementID;

    }

    fetchData() {
        const element_id = this.props.params.elementID;
        this.props.fetchElements(element_id, true);
    }

    render() {
        const elementID = this.props.params.elementID;
        const {aggregations, elements} = this.props;
        
        const element = elements[elementID];

        console.log(element != {});
        console.log(element);

        if (element != {} && element != undefined && element.id == elementID) {
            console.log(element.id);
            let aggregationsList = [];
            element.aggregations.map( function(agg, i){
                if (agg in aggregations)
                    aggregationsList.push( aggregations[agg]);
            })

            return (
                <div>
                    <div>
                        <Proposal
                            proposal={element}
                            aggregations={aggregationsList}
                        />
                    </div>
        
                    {debug(element)}
                </div>
            );

        } else {
            //try to fetch it!
            console.log("fetch");
            
            this.fetchData();
            return (
                <div>
                    <LoadingAnimation />
                    {debug(element)}
                </div>
            );
        }
    }
}

ElementView.propTypes = {
    loaded: PropTypes.bool,
    elements: PropTypes.object,
    aggregations: PropTypes.array,
    token: PropTypes.string,
};
