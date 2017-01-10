import React, { Component } from 'react'

import TextField from 'material-ui/TextField';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
};

export class AggregationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aggregations: props.aggregations,
        };
    }

    render() {

        const aggregations = this.state.aggregations;

        return  (
            <div>
                <Table
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={this.handleAggregations}
                >
                    <TableHeader
                        displaySelectAll={false}
                        enableSelectAll={false}
                    >
                      <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>

                    <TableBody
                        stripedRows={false}
                        deselectOnClickaway={false}
                    >
                {
                    aggregations.map(function(agg, index) {
                        return (
                            <TableRow key={"tableRow_"+index}>
                              <TableRowColumn>{agg.name}</TableRowColumn>
                            </TableRow>
                        )
                    })
                }
                    </TableBody>
                </Table>

            {
                    this.state.aggregations_error_text &&
                    <div>
                        <TextField
                            id="aggregationError"
                            style={{marginTop: 0}}
                            floatingLabelText=""
                            value=""
                            errorText={this.state.aggregations_error_text}
                        />
                        <br/>
                        <br/>
                    </div>
            }

            </div>
        );
    }
}

AggregationsList.propTypes = {
    aggregations: React.PropTypes.object.isRequired,
};
