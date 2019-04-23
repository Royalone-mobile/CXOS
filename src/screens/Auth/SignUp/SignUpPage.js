// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavLink} from 'react-router-dom';
import { Button, Popover, PopoverBody, UncontrolledPopover } from 'reactstrap';
import PropTypes from 'prop-types';

import signInLogo from '../../../assets/icons/x-logo-sign-in.svg';
import IcoSignIn from '../../../assets/icons/ico-signin.png';
import IcoCatalog from '../../../assets/icons/catalog.png';
import IcoPopoverLogo from '../../../assets/icons/popover-logo.png';
import IcoSupport from '../../../assets/icons/support.png';
import IcoClose from '../../../assets/icons/ico-close.png';
import IcoInfo from '../../../assets/icons/ico-info.png';
import './SignUpPage.scss';
import {signup} from '../../../services/api/httpclient';
import FloatingOutlineInput from '../../../components/FloatingOutlineInput/FloatingOutlineInput';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            popoverOpen: false, 
            expanded:'', 
            mobile_info: false,
        };
    }

    componentDidMount() {

    }

    togglePopover() {
        this.setState({ popoverOpen: !this.state.popoverOpen});
    }

    onMouseEnter = () => {
        this.setState({expanded:true});
    }

    onMouseLeave = () => {
        this.setState({expanded:false});
    }

    showSideContent = () => {
        this.setState({mobile_info:true});
    }

    hideSideContent = () => {
        this.setState({mobile_info:false});
    }   
    
    onContinueSetup = () => {
        var formData = this.props.form.getFieldsValue();
        signup(formData).then(ret=>{
            console.log(ret);
            let noError = true;
            if(ret.data.errors.username) {
                this.props.form.setFields({
                    username: {
                        value: formData.username,
                        errors: [new Error(ret.data.errors.username)],
                    }
                });
                noError = false;
            }

            if(ret.data.errors.first_name) {
                this.props.form.setFields({
                    first_name: {
                        value: formData.first_name,
                        errors: [new Error(ret.data.errors.first_name)],
                    }
                });
                noError = false;
            }


            if(ret.data.errors.last_name) {
                this.props.form.setFields({
                    last_name: {
                        value: formData.last_name,
                        errors: [new Error(ret.data.errors.last_name)],
                    }
                });
                noError = false;
            }

            if(ret.data.errors.password1) {
                this.props.form.setFields({
                    password1: {
                        value: formData.password1,
                        errors: [new Error(ret.data.errors.password1)],
                    }
                });
                noError = false;
            }

            if(ret.data.errors.password2) {
                this.props.form.setFields({
                    password2: {
                        value: formData.password2,
                        errors: [new Error(ret.data.errors.password2)],
                    }
                });
                noError = false;
            }

            if(noError)
                this.props.history.push('/addorganization');
        }, err=>{
            console.log(err);
        });
    }

    renderPasswordPolicyDesktop = () => {
        return (
            <UncontrolledPopover  placement="bottom" target="Popover2" className="popover-menu" delay={100}>
                <PopoverBody>
                    <div>
                        <label style={{color:'white', fontSize:'16px'}}>
                            Password policy<br/>
                        </label>
                        <label style={{color:'white', fontSize:'14px'}}>
                            Passwords must be at least 8 characters long, and contain the following 4 items<br/>
                            ◆ An upper-case character (A-Z)<br/>
                            ◆ A lower-case character(a-z)<br/>
                            ◆ A digit(0-9)<br/>
                            ◆ A non-alphanumeric character(@, &, &nbsp;&nbsp;&nbsp;&nbsp;*, for example)<br/>
                        </label>
                    </div>
                </PopoverBody>
            </UncontrolledPopover>
        );
    }

    renderPasswordPolicyMobile = () => {
        return (
            <UncontrolledPopover  placement="bottom" target="Popover3" className="popover-menu" delay={100} trigger="focus" >
                <PopoverBody>
                    <div>
                        <label style={{color:'white', fontSize:'16px'}}>
                            Password policy<br/>
                        </label>
                        <label style={{color:'white', fontSize:'14px'}}>
                            Passwords must be at least 8 characters long, and contain the following 4 items<br/>
                            ◆ An upper-case character (A-Z)<br/>
                            ◆ A lower-case character(a-z)<br/>
                            ◆ A digit(0-9)<br/>
                            ◆ A non-alphanumeric character(@, &, &nbsp;&nbsp;&nbsp;&nbsp;*, for example)<br/>
                        </label>
                    </div>
                </PopoverBody>
            </UncontrolledPopover>
        );
    }

    onFirstNameChange = (evt) => {
        this.props.form.setFieldsValue({
            first_name: evt.target.value,
        });
    }

    onLastNameChange = (evt) => {
        this.props.form.setFieldsValue({
            last_name: evt.target.value,
        });
    }

    onUserNameChange = (evt) => {
        this.props.form.setFieldsValue({
            username: evt.target.value,
        });
    }

    onPasswordChange = (evt) => {
        this.props.form.setFieldsValue({
            password1: evt.target.value,
        });
    }

    onConfirmChange = (evt) => {
        this.props.form.setFieldsValue({
            password2: evt.target.value,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="div-content" style={{ height : '100%'}}>
                {this.renderPasswordPolicyDesktop()}
                {this.renderPasswordPolicyMobile()}
                <nav className="navbar">
                    <div className="float-left">
                        <Button id="Popover1" type="button" className="btn-burger">
                            <i className="fas fa-bars"></i>
                        </Button>
                        <p className="float-left navbar-title">Sign Up</p>
                        <Popover  placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover.bind(this)} className="popover-menu" delay={100}>
                            <PopoverBody>
                                <div className="popover-content" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                                    <div className={!this.state.expanded?'popover-item':'popover-item-expanded'}>
                                        <NavLink to={'/'}><img src={IcoPopoverLogo} className="dot"/><img src={IcoPopoverLogo} style={{width:'20px', height:'18px', marginLeft:'10px', marginRight:'10px'}}/></NavLink>
                                        <NavLink to={'/catalogue'} className={!this.state.expanded?'popover-item-text':'popover-item-text__visible'}>CXOS</NavLink>
                                    </div>
                                    <hr className="border-white"/>
                                    <div className={!this.state.expanded?'popover-item':'popover-item-expanded'}>
                                        <NavLink to={'/catalogue'}><img src={IcoPopoverLogo} className="dot"/><img src={IcoCatalog} style={{width:'15px', height:'15px', marginLeft:'10px', marginRight:'10px'}}/></NavLink>
                                        <NavLink to={'/catalogue'} className={!this.state.expanded?'popover-item-text':'popover-item-text__visible'}>Catalog</NavLink>
                                    </div>
                                    <div className={!this.state.expanded?'popover-item':'popover-item-expanded'}>
                                        <NavLink to={'/support'}><img src={IcoPopoverLogo} className="dot"/><img src={IcoSupport} style={{width:'15px', height:'15px', marginLeft:'10px', marginRight:'10px'}}/></NavLink>
                                        <NavLink to={'/catalogue'} className={!this.state.expanded?'popover-item-text':'popover-item-text__visible'}>Support</NavLink>
                                    </div>
                                </div>
                            </PopoverBody>
                        </Popover>
                    </div>

                    <div className="float-right">
                        {this.state.mobile_info?<img className="btn-hide-info" src={IcoClose} style={{ marginRight:'25px'}} onClick={this.hideSideContent.bind(this)}/>:<img className="btn-show-info" src={IcoInfo} style={{ marginRight:'25px', width:'22px', height:'22px'}} onClick={this.showSideContent.bind(this)}/>}
                    </div>
                </nav>

                <div className="container" style={{ height : 'calc(100% - 120px)', paddingTop: '20px', paddingBottom: '20px'}}>
                    <div className="row" style={{ height : '100%'}}>
                        <div className={'col-lg-7 col-md-7 div-signup ' +  (this.state.mobile_info?'disp-none':'disp-block')} >
                            <div style={{paddingBottom:'20px'}}>
                                <div className="div-signup-header">
                                    <div className="float-left">
                                        <img src={signInLogo} />
                                        <label className="label-signup">
                                            Sign Up
                                        </label>
                                    </div>
                                    <div className="float-right" style={{verticalAlign:'sub'}}>
                                        <p className="lbl-required">*required</p>
                                    </div>
                                </div>
                                
                                <hr className="clearfix"/>

                                <div>
                                    <div className="float-left">
                                        <label className="lbl-steps">Step 1 of 3</label>
                                    </div>
                                    <div className="float-right mobile-only"> <p className="lbl-required">*required</p></div>
                                </div>
                                

                                <Form >
                                    <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                        <FormItem className="float-left form-signup-firstname">
                                            {getFieldDecorator('first_name', {
                                                rules: [{required: true, message: 'Please input your firstname!'}, {validator: this.checkEmail}],
                                            })(
                                                <FloatingOutlineInput type="text" label='First Name*' onChange={this.onFirstNameChange.bind(this)}>
                                                </FloatingOutlineInput>
                                            )}
                                        </FormItem>
                                        <FormItem className="float-right form-signup-lastname">
                                            {getFieldDecorator('last_name', {
                                                rules: [{required: true, message: 'Please input your lastname!'}, {validator: this.checkEmail}],
                                            })(
                                                <FloatingOutlineInput type="text" label='Last Name*' onChange={this.onLastNameChange.bind(this)}>
                                                </FloatingOutlineInput>
                                            )}
                                        </FormItem>
                                    </div>

                                    <div className="layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                        <FormItem className="form-signup-email">
                                            {getFieldDecorator('username', {
                                                rules: [{required: true, message: 'Please input your lastname!'}],
                                            })(
                                                <FloatingOutlineInput type="email" label='Email Address*' onChange={this.onUserNameChange.bind(this)}>
                                                </FloatingOutlineInput>
                                            )}
                                        </FormItem>
                                    </div>

                                    <hr className="clearfix desktop-only" style={{paddingTop:'10px', paddingBottom:'10px'}} />
                                    <div className="layout-signup-form-line">
                                        <FormItem className="float-left form-signup-password">
                                            {getFieldDecorator('password1', {
                                                rules: [{required: true, message: 'Please input your password!'}],
                                            })(
                                                <FloatingOutlineInput type="password" label='Password*' onChange={this.onPasswordChange.bind(this)}>
                                                </FloatingOutlineInput>
                                            )}
                                        </FormItem>

                                        <div className="mobile-only">
                                            <Button id="Popover2" type="button" className="label-passwordpolicy">
                                                Password policy
                                            </Button>
                                        </div>

                                        <FormItem className="float-right form-signup-password">
                                            {getFieldDecorator('password2', {
                                                rules: [{required: true, message: 'Please confirm your password!'}],
                                            })(
                                                <FloatingOutlineInput type="password" label='Confirm Password*' onChange={this.onConfirmChange.bind(this)}>
                                                </FloatingOutlineInput>
                                            )}
                                        </FormItem>
                                    </div>

                                    <div style={{paddingTop:'5px'}} className="clearfix desktop-only">
                                        <Button id="Popover3" type="button" className="label-passwordpolicy">
                                            Password policy
                                        </Button>
                                    </div>
                                </Form>
                                            
                                <Checkbox style={{color:'white', marginTop:'15px', fontSize:'13px', marginLeft:'10px', marginBottom:'10px'}}>
                                    Check here to indicate that you have read and agree to the terms of the <br/>&ensp;&ensp;&ensp;&nbsp;<NavLink to={'/passwordpolicy/'}>CXOS Customer Agreement</NavLink>
                                </Checkbox>

                                <div className="text-center div-signup1-buttons">
                                    <button type="submit" className="btn btn-green-gradient btn-browse-patterns">
                                        <i className="fas fa-eye" />
                                        <span style={{ fontSize: '13px', paddingRight:'10px'}}>&nbsp;&nbsp;Browse Design Patterns</span>
                                    </button>

                                    <button className="btn btn-green-gradient btn-continue-setup" onClick={this.onContinueSetup.bind(this)}>
                                        <img src={IcoSignIn} />
                                        <span style={{ fontSize: '13px', paddingRight:'10px'}}>&nbsp;&nbsp;Continue Account Setup</span>
                                    </button>
                                </div>

                                <hr/>

                                <div className="text-center div-signup-copyright">
                                    ©2019 Eplexity All rights reserved.
                                </div>
                                <div className="text-center div-terms-policy">
                                    Privacy Policy | Terms of Use
                                </div>
                            </div>
                        </div>

                        <div className={'col-lg-5 col-md-5 signup-side-content ' + (!this.state.mobile_info?'':'disp-block')}>
                            <div>
                                <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px'}}>
                                    <h5 className="lbl-support-info">Supporting Informatinal Text</h5>
                                    <hr/>
                                    <label className="lbl-signup-sidecontent">
                                        ISed varius sem et egestas blandit. Aliquam vulputate, dolor nec sodales aliquam, tellus metus eleifend ex, sit amet condimentum neque sem vitae elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer lobortis tempus viverra. Nunc dictum, mi eu ullamcorper viverra, ex dolor commodo mauris, quis ultrices nisl nisl et lectus. Nulla convallis dolor ac erat rhoncus volutpat.. <br/><br/>
                                        Vivamus tempor nisl ac auctor pulvinar. Sed varius sem et egestas blandit. Aliquam vulputate, dolor nec sodales aliquam, tellus metus eleifend ex, sit amet condimentum neque sem vitae elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer lobortis tempus viverra. Nunc dictum, mi eu ullamcorper viverra, ex dolor commodo mauris, quis ultrices nisl nisl et lectus. Nulla convallis dolor ac erat rhoncus volutpat.
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    history: PropTypes.object,
    form :  PropTypes.object
};


// CONFIGURE REACT REDUX

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

const WrappedSignUpPage = Form.create()(SignUpPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignUpPage);
