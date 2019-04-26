// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavLink} from 'react-router-dom';
import { Button, Popover, PopoverBody } from 'reactstrap';
import './LoginPage.scss';
import PropTypes from 'prop-types';
import signInLogo from '../../../assets/icons/x-logo-sign-in.svg';
import IcoSignIn from '../../../assets/icons/ico-signin.png';
import IcoCatalog from '../../../assets/icons/catalog.png';
import IcoPopoverLogo from '../../../assets/icons/popover-logo.png';
import IcoSupport from '../../../assets/icons/support.png';
import IcoClose from '../../../assets/icons/ico-close.png';
import IcoInfo from '../../../assets/icons/ico-info.png';
import Iframe from '../../../components/Iframe/Iframe';
import FloatingOutlineInput from '../../../components/FloatingOutlineInput/FloatingOutlineInput';
import {login} from '../../../services/api/httpclient';
import { Form, Checkbox } from 'antd';


const FormItem = Form.Item;
const iframe = '<iframe width="80%" height="315" src="https://www.youtube.com/embed/ybcV0sJ_T_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

class LoginPage extends Component {
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

    onSignIn = () => {
        var formData = this.props.form.getFieldsValue();
        console.log(formData);

        login(formData).then(ret=>{
            console.log(ret);
        }, err=>{
            console.log(err);
            // this.props.form.setFields({
            //     email: {
            //         value: username,
            //         errors: [new Error('Error')],
            //     }
            // });
        });
    }
    
    checkEmail = (rule, value, callback) => {
        callback();
    }

    onUserNameChange = (evt) => {
        this.props.form.setFieldsValue({
            username: evt.target.value,
        });
    }

    onPasswordChange = (evt) => {
        this.props.form.setFieldsValue({
            password: evt.target.value,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="div-content" style={{height:'100%'}}>
                <nav className="navbar">
                    <div className="float-left">
                        <Button id="Popover1" type="button" className="btn-burger">
                            <i className="fas fa-bars"></i>
                        </Button>

                        <p className="float-left navbar-title">Sign In</p>
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
                    <div className="row">
                        <div className={'col-lg-4 col-md-4 div-signin ' +  (this.state.mobile_info?'disp-none':'disp-block')} >
                            <div>
                                <div className="div-signin-header">
                                    <img src={signInLogo} />
                                    <label className="label-signin">
                                        Sign In
                                    </label>
                                </div>
                                <hr/>
                                
                                <Form>
                                    <FormItem>
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: 'Please input your email!'}, {validator: this.checkEmail}, {validateOn:'change'}],
                                        })(
                                            <FloatingOutlineInput type="email" label='Email' onChange={this.onUserNameChange.bind(this)} style={{marginTop:'2vh'}}>
                                            </FloatingOutlineInput>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please input your password!'}, {validator: this.checkEmail}, {validateOn:'change'}],
                                        })(
                                            <FloatingOutlineInput type="password" label='Password' onChange={this.onPasswordChange.bind(this)} style={{marginTop:'5vh'}}>
                                            </FloatingOutlineInput>
                                        )}
                                    </FormItem>
                                </Form>

                                <div style={{marginTop:'5px'}}><NavLink to={'/forgotpassword/'} className="label-forgotpassword">Forgot Your password?</NavLink></div>
                                <Checkbox style={{color:'white', marginTop:'15px', fontSize:'13px', marginLeft:'10px', marginBottom:'10px'}}>Remember Me</Checkbox>
                                <div className="text-center v-gap">
                                    <button type="submit" className="btn btn-green-gradient" onClick={this.onSignIn.bind(this)}>
                                        <img src={IcoSignIn} />
                                        <span className="lbl-signin">&nbsp;&nbsp;Sign in</span>
                                    </button>
                                </div>

                                <p className="lbl-click-signin">
                                    By clicking Sign In, you agree to our <a href="">License<br className="lbl-sidecontent-mobile-break"/> Agreement</a>, 
                                    and have read and acknowledge our <a href="">Privacy Statement</a>.
                                </p>
                               
                                <p><NavLink to={'/forgotpassword/'}>Forgot your password?</NavLink></p>
                                <p><NavLink to={'/signup/'}>Create an account</NavLink></p>
                            </div>
                        </div>


                        <div className={'col-lg-8 col-md-8 side-content ' + (!this.state.mobile_info?'':'disp-block')}>
                            <div>
                                <hr className="mobile-only"/>
                           
                                <div className="text-center video-responsive">
                                    <Iframe  iframe={iframe}/>
                                </div>

                                <div className="div-checkout">
                                    <h5 className="lbl-checkout">
                                        Check This Out
                                    </h5>


                                    <hr className="mobile-only"/>
                                    <hr className="desktop-only" style={{borderWidth:'3px'}}/>
                                    
                                   
                                    <label className="lbl-login-sidecontent">
                                        In order to deploy Bananas, consectetur adipiscing elit. Curabitur finibus arcu ac nulla porta, ac dignissim justo cursus. Sed eleifend sagittis arcu non blandit. Praesent at pretium mauris. Ut nec est volutpat, egestas sem ut, bibendum justo. Nullam lobortis vitae mi at volutpat. Vestibulum consectetur id turpis et tempor. 
                                        <br />
                                        <br />
                                        Vivamus tempor nisl ac auctor pulvinar. Sed varius sem et egestas blandit. Aliquam vulputate, dolor nec sodales aliquam, tellus metus eleifend ex, sit amet condimentum neque sem vitae elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer lobortis tempus viverra. Nunc dictum, mi eu ullamcorper viverra, ex dolor commodo mauris, quis ultrices nisl nisl et lectus. Nulla convallis dolor ac erat rhoncus volutpat.
                                    </label>

                                    <div className="text-center layout-taketour">
                                        <button className="btn btn-green-gradient btn-taketour">
                                            <i className="fas fa-eye" />
                                            <span className="lbl-taketour">&nbsp;&nbsp;Take The Tour</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    form :  PropTypes.object
};


// CONFIGURE REACT REDUX
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

const WrappedLoginPage = Form.create()(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginPage);
