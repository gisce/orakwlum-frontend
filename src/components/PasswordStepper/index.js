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

const revalidator = require('revalidator');

const styles = {
    dialog: {
      width: '80%',
      maxWidth: 'none',
    }
};

const validations = {
    passwd: {
        description: 'New password',
        type: 'string',
        minLength: 6,
        maxLength: 100,
        allowEmpty: false,
        required: true,
    },
};

export class PasswordStepper extends Component {
  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  passwd = {
      p1: null,
      p2: null,
  }

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

  validateUpper = (passwd)  => {
      if (!passwd.match(/^.*[A-Z]+.*$/)){
          this.setState({
              new_passwd_error_text: "New password must have at least one number, UPPER or a symbol",
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }
      return true;
  }

  validateLower = (passwd)  => {
      if (!passwd.match(/^.*[a-z]+.*$/)){
          this.setState({
              new_passwd_error_text: "New password must have at least one lower character",
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }
      return true;
  }

  validateNumber = (passwd)  => {
      if (!passwd.match(/^.*[0-9]+.*$/)){
          this.setState({
              new_passwd_error_text: "New password must have at least one number, UPPER or a symbol",
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }
      return true;
  }

  validateSymbol = (passwd)  => {
      if (!passwd.match(/^.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+.*$/)){
          this.setState({
              new_passwd_error_text: "New password must have at least one number, UPPER or a symbol",
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }
      return true;
  }

  validateSame = (passwd1, passwd2)  => {
      if (passwd1 != passwd2) {
          this.setState({
              new_passwd_error_text: "New passwords do not match",
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }
      return true;
  }


  validateNewPasswd = (passwd1, passwd2) => {
      const passwd_validation = revalidator.validate({ name: passwd1}, { properties: { name: validations.passwd} } );

      //validate policy
      if (passwd_validation.valid) {
          //lower is mandatory and (UPPER or numb3r or symbol)
          if (this.validateLower(passwd1) &&
            (
                this.validateUpper(passwd1)
                ||
                this.validateNumber(passwd1)
                ||
                this.validateSymbol(passwd1)
            )) {
                this.setState({
                    new_passwd_error_text: null,
                    new_passwd_validation: true,
                    readyToNext: true,
                });
                return true;
            }

/*
                const symbolCheck =
                const sameCheck = this.validateSame(passwd1, passwd2);
*/


      } else {
          this.setState({
              new_passwd_error_text: "New password " + passwd_validation.errors[0].message,
              new_passwd_validation: false,
              readyToNext: false,
          });
          return false;
      }

  }

  handleChangeNewPasswd = (passwd1, passwd2) => {
      console.log("entro");
      console.dir(passwd1);
      this.validateNewPasswd(passwd1, passwd2);
      console.log("OK? " + this.state.new_passwd_validation);
  };


  handleChangeNewPasswd1 = (event, new_passwd) => {
      let passwd = this.passwd;
      passwd.p1 = new_passwd;
      this.handleChangeNewPasswd(passwd.p1, passwd.p2);
  };

  handleChangeNewPasswd2 = (event, new_passwd) => {
      let passwd = this.passwd;
      passwd.p2 = new_passwd;
      this.handleChangeNewPasswd(passwd.p1, passwd.p2);
  };


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
                      onChange={this.handleChangeNewPasswd1}
                      />
                  <br/>
                  <TextField
                      style={{marginTop: 0}}
                      floatingLabelText="Your new password again..."
                      type="password"
                      onChange={this.handleChangeNewPasswd2}
                      errorText={this.state.new_passwd_error_text}
                      />

                  <p><br/>Your new password must accomplish:</p>
                  <ul>
                      <li>At least 6 characters</li>
                      <li>Be alphanumeric</li>
                      <li>Include at least one</li>
                      <ul>
                          <li>Lower case character <i>[a-z]</i></li>
                          <li>Upper case character <i>[A-Z]</i></li>
                          <li>Symbol <i>{"[-!$%^&*()_+|~=`{}[]:\";'\<>?,.\/)]"}</i></li>
                      </ul>
                  </ul>
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
