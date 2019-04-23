// IMPORT PACKAGE REFERENCES

import React from 'react';
import PropTypes from 'prop-types';

// COMPONENT

class IframeComponent extends React.Component {
    iframe() {
        return {
            __html: this.props.iframe
        };
    }

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={this.iframe()} />
            </div>
        );
    }
}

IframeComponent.propTypes = {
    iframe: PropTypes.string
};


// EXPORT COMPONENT

export default IframeComponent;