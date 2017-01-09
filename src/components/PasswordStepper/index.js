import React, { Component } from 'react'

import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Divider from 'material-ui/Divider';

const styles = {
    dialog: {
      width: '80%',
      maxWidth: 'none',
    }
};

export class PasswordStepper extends Component {
  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  validateNewPasswd = (passwd1, passwd2) => {
      const field_name = "newPasswd";
      const state_error_text = field_name + "_error_text";
      const state_validation = field_name + "_validation";


      if (passwd1 != passwd2) {
          this.setState({
              [state_error_text]: "New passwords do not match",
              [state_validation]: false,
              readyToNext: false,
          });
          return false;
      }
  }


  getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (
                <div>
                  <p><b>Insert twice</b> your desired <b>new password</b>:</p>
                  <TextField
                      style={{marginTop: 0}}
                      floatingLabelText="Your new password"
                      type="password"
                      />
                  <br/>
                  <TextField
                      style={{marginTop: 0}}
                      floatingLabelText="Your new password again..."
                      type="password"
                      />
                  <p><br/>Your new password must accomplish:</p>
                  <p> - At least 6 characters</p>
                  <p> - Be alphanumeric</p>
                  <p> - ...</p>
                </div>
            );

        case 1:
            return (
                <div>
                    <p>Great! Now <b>insert your password</b> in the following field:</p>
                    <p>Your current password is needed to ensure that you're authorized to change it.</p>
                    <TextField
                        style={{marginTop: 0}}
                        floatingLabelText="Your current password"
                        type="password"
                        />
                </div>
            );
        default:
            return 'Mmmm.... that\'s embracing...';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Change again
            </a>.
          </p>
          <p>Password change status</p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 1 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
              <StepLabel>New password</StepLabel>
          </Step>
          <Step>
            <StepLabel>Current password</StepLabel>
          </Step>
        </Stepper>
          {this.renderContent()}
      </div>
    );
  }
}

PasswordStepper.propTypes = {
    open: React.PropTypes.bool,
};
