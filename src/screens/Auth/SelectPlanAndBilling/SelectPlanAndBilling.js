// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Popover, PopoverBody } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Radio} from 'antd';
import './SelectPlanAndBilling.scss';
import signInLogo from '../../../assets/icons/x-logo-sign-in.svg';
import IcoSignIn from '../../../assets/icons/ico-signin.png';
import IcoCatalog from '../../../assets/icons/catalog.png';
import IcoPopoverLogo from '../../../assets/icons/popover-logo.png';
import IcoSupport from '../../../assets/icons/support.png';
import IcoClose from '../../../assets/icons/ico-close.png';
import IcoInfo from '../../../assets/icons/ico-info.png';

class SelectPlanAndBilling extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            popoverOpen: false,
            expanded:'', 
            mobile_info: false,
            hasCXOSAcc: false,
            hasMobileSMS: false
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

    onToggleCXOSAcc = () => {
        let hasCXOSAcc = this.state.hasCXOSAcc;
        hasCXOSAcc = !hasCXOSAcc;
        this.setState({hasCXOSAcc});
    }

    onToggleSMS = () => {
        let hasMobileSMS = this.state.hasMobileSMS;
        hasMobileSMS = !hasMobileSMS;
        this.setState({hasMobileSMS});
    }

    onCancel = () => {
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div id="div-content" style={{ height : '100%'}}>
                <nav className="navbar">
                    <div className="float-left">
                        <Button id="Popover1" type="button" className="btn-burger">
                            <i className="fas fa-bars"></i>
                        </Button>
                        <p className="float-left navbar-title">Sign Up</p>
                        <p className="float-left navbar-subtitle">Billing Information</p>
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
                        <div className={'col-lg-7 col-md-7 ' +  (this.state.mobile_info?'disp-none':'disp-block')} >
                            <div style={{paddingBottom:'20px'}}>
                                <div className="div-signup-header">
                                    <div className="float-left">
                                        <img src={signInLogo} />
                                        <label className="label-signup">
                                            Select a Plan & Billing Information
                                        </label>
                                    </div>
                                    <div className="float-right" style={{verticalAlign:'sub'}}>
                                        <p className="lbl-required">*required</p>
                                    </div>
                                </div>
                                
                                <hr className="clearfix"/>

                                <div>
                                    <div className="float-left">
                                        <label className="lbl-steps">Step 3 of 3</label>
                                    </div>
                                    <div className="float-right mobile-only"> <p className="lbl-required">*required</p></div>
                                </div>

                                <div className="clearfix">
                                    <span style={{fontSize:'24px'}}>Billing</span>
                                    <hr  />
                                </div>


                                <div className="clearfix  layout-signup-form-line" defaultValue={'a'}>
                                    <Radio.Group buttonStyle={'solid'} style={{width:'100%'}}>
                                        <Radio  value="a" style={{color:'white', width:'48%', float:'left', fontSize:'12px', paddingLeft:'10px'}}>
                                            Use credit card
                                        </Radio>

                                        <Radio  value="b" style={{color:'white', width:'48%', float:'left', fontSize:'12px', paddingLeft:'10px'}}>
                                            Or use a virtual checking account(APH)
                                        </Radio>
                                    </Radio.Group>
                                </div>

                                <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                    <input type = "text" className="form-control float-left form-signup-address1" placeholder="Card Number*" required/>
                                    <input type = "text" className="form-control float-right form-signup-address2" placeholder="Name on card*" required/>
                                </div>

                                <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                    <div className="float-left form-layout-state">
                                        <select className="form-control  float-left form-signup-expire-date">
                                            <option value=''>Exp.date(MM/YY)*</option>
                                            <option value='1'>One</option>
                                            <option value='2'>Two</option>
                                        </select>
                                    </div>
                                    <input type = "text" className="form-control float-right form-signup-address2" placeholder="Security Code*" required/>
                                </div>


                                <div className="form-check v-gap clearfix" style={{marginTop:'10px'}}>
                                    <input className="form-check-input" style={{marginTop:'8px'}} type="checkbox" name="login_remember_me" id="login_remember_me" value="true"  checked={this.state.hasCXOSAcc} onChange={this.onToggleCXOSAcc.bind(this)}/>
                                    <label className="label-rememberme form-check-label" htmlFor="login_remember_me">
                                        Same as organization address
                                    </label>
                                </div>

                                {/* {this.state.hasCXOSAcc?<hr className="clearfix"/>:null} */}

                                <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                    <input type = "email" className="form-control form-signup-countryregion" placeholder="Country Region*" required/>
                                </div>

                                <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                    <input type = "text" className="form-control float-left form-signup-address1" placeholder="Address1*" required/>
                                    <input type = "text" className="form-control float-right form-signup-address2" placeholder="Address2*" required/>
                                </div>
                                
                                <div className="clearfix layout-signup-form-line" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                    <input type = "text" className="form-control float-left form-signup-city" placeholder="City*" required/>
                                    <div className="float-right form-layout-state">
                                        <select className="form-control  float-left form-signup-state">
                                            <option value=''>State*</option>
                                            <option value='1'>One</option>
                                            <option value='2'>Two</option>
                                        </select>

                                        <input type = "text" className="form-control float-right form-signup-postalcode" placeholder="Postal code*" required/>
                                    </div>
                                </div>

                                <div className="text-center div-signup3-buttons">
                                    <button onClick={this.onCancel.bind(this)} className="btn btn-dark btn-sm">
                                        Cancel
                                    </button>

                                    <button type="submit" className="btn btn-green-gradient btn-continue-setup">
                                        <img src={IcoSignIn} />
                                        <span style={{ fontSize: '13px', paddingRight:'10px'}}>&nbsp;&nbsp;Finish Account Setup</span>
                                    </button>
                                </div>

                                <hr/>
                                <div>
                                    <div className="text-center div-signup-copyright">
                                        ©2019 Eplexity All rights reserved.
                                    </div>
                                    <div className="text-center div-terms-policy">
                                        Privacy Policy | Terms of Use
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'col-lg-5 col-md-5 add-organization-side-content ' + (!this.state.mobile_info?'':'disp-block')}>
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

SelectPlanAndBilling.propTypes = {
    history: PropTypes.object
};

// CONFIGURE REACT REDUX
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlanAndBilling);
