import React, { Component, PropTypes } from 'react';
import Const from '../Const';

class MRMFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.timeout = null;
    this.state = {
      value: ''
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  filter(e) {
    e.preventDefault();
    this.props.filterHandler(this.state.value, Const.FILTER_TYPE.MRM);
  }

  componentDidMount() {
    const defaultValue = this.refs.inputText.value;
    if (defaultValue) {
      this.props.filterHandler(defaultValue, Const.FILTER_TYPE.MRM);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleTextChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { placeholder, columnName, defaultValue } = this.props;
    return (
      <form onSubmit={ this.filter }>
        <input ref='inputText'
          className='filter text-filter form-control'
          type='text'
          onChange={ this.handleTextChange }
          placeholder={ placeholder || `Enter ${columnName}...` }
          defaultValue={ defaultValue ? defaultValue : '' } />
      </form>
    );
  }
}

MRMFilter.propTypes = {
  filterHandler: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  columnName: PropTypes.string
};

export default MRMFilter;
