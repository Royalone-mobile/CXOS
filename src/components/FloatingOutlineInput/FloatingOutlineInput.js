// IMPORT PACKAGE REFERENCES

import React from 'react';
import PropTypes from 'prop-types';
import './FloatingOutlineInput.scss';
// COMPONENT
import { Input } from 'antd';

class FloatingOutlineInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floating: false,
            username:''
        };
    }

    onFocus = () => {
        this.setState({floating:true});
    }

    onBlur = () => {
        if(this.state.username==='')
            this.setState({floating:false});
        else
            this.setState({floating:true});
    }

    onChange = (evt) => {
        this.setState({username:evt.target.value});
        this.props.onChange(evt);
    }

    render() {
        return (
            <div className={'float-container ' + (this.state.floating?'active':'')} style={this.props.style}>
                <label>{this.props.label}</label>
                {/* <input type="text" id="floatField1" className="form-control form-email " onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/> */}
                <Input type={this.props.type} className="form-control" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} 
                    onChange={this.onChange.bind(this)}/>
            </div>
        );
    }
}

FloatingOutlineInput.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    type: PropTypes.string
};


// EXPORT COMPONENT

export default FloatingOutlineInput;