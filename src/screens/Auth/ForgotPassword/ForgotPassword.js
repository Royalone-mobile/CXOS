// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { Button, Popover, PopoverBody } from 'reactstrap';
import './ForgotPassword.scss';
import signInLogo from '../../../assets/icons/x-logo-sign-in.svg';
import IcoSignIn from '../../../assets/icons/ico-signin.png';
import IcoCatalog from '../../../assets/icons/catalog.png';
import IcoPopoverLogo from '../../../assets/icons/popover-logo.png';
import IcoSupport from '../../../assets/icons/support.png';
import IcoClose from '../../../assets/icons/ico-close.png';
import IcoInfo from '../../../assets/icons/ico-info.png';
import Iframe from '../../../components/Iframe/Iframe';


const iframe = '<iframe width="80%" height="315" src="https://www.youtube.com/embed/ybcV0sJ_T_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            popoverOpen: false, 
            expanded:'', 
            mobile_info: false,
            steps: 1,
            navtitle:'Sign In Help'
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

    onCancel = () => {
        let { steps } = this.state;
        if(steps==1)
            this.props.history.goBack();
        else {
            steps--;
            this.setState({steps}, () => {
                this.modifyNavTitle();
            });
        }
            
    }

    onContinue = () => {
        let steps = this.state.steps;
        steps += 1;

        if(steps<=3) {
            this.setState({steps}, () => {
                this.modifyNavTitle();
            });
        }
    }

    modifyNavTitle = () => {
        let {steps} = this.state;
        let navtitle = 'Sign In Help';
        switch(steps) {
            case 2:
                navtitle='Check Email';
                break;
            case 3:
                navtitle='Reset Password';
                break;
        }

        this.setState({navtitle});
    }


    render() {
        return (
            <div id="div-content" style={{height:'100%'}}>
                <nav className="navbar">
                    <div className="float-left">
                        <Button id="Popover1" type="button" className="btn-burger">
                            <i className="fas fa-bars"></i>
                        </Button>
                        <p className="float-left navbar-title">{this.state.navtitle}</p>
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
                                        {this.state.navtitle}
                                    </label>
                                </div>
                                
                                <hr/>

                                {this.state.steps==1?<input type = "email" className="form-control form-email" placeholder="Email" required/>:null}
                                
                                {this.state.steps==2?<div>
                                    <input type = "number" className="form-control form-email" placeholder="Enter the 6-digit code" required/>
                                    <span className="label-sentcode">We sent a code to a******n@gmail.com</span>
                                </div>:null}

                                {this.state.steps==3?<div>
                                    <input type = "password" className="form-control form-password" placeholder="Password" required/>
                                    <input type = "password" className="form-control form-password" placeholder="Confirm Password" required/>
                                </div>:null}

                                <div className="text-center v-gap" style={{marginTop:'20px'}}>
                                    <button onClick={this.onCancel.bind(this)} className="btn btn-dark btn-sm btn-forgotpassword-cancel">
                                        Cancel
                                    </button>
                                    <button onClick={this.onContinue.bind(this)} className="btn btn-green-gradient btn-forgotpassword-continue">
                                        <img src={IcoSignIn} />
                                        {this.state.steps==3?<span style={{ fontSize: '13px', paddingRight:'10px'}}>&nbsp;&nbsp;Reset Password</span>:<span style={{ fontSize: '13px', paddingRight:'10px'}}>&nbsp;&nbsp;Continue</span>}
                                    </button>
                                </div>
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

                                    <div className="text-center">
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

ForgotPassword.propTypes = {
    history: PropTypes.object
};


// CONFIGURE REACT REDUX
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
