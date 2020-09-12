import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = (props) => {

	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
	};

	return (
		<form className='ui form error' onSubmit={props.handleSubmit(onSubmit)}>
			<Field name='title' component={renderInput} label='Enter Title' />
			<Field name='description' component={renderInput} label='Enter Description' />
			<button className='ui button primary'>Submit</button>
		</form>
	);
};

const renderInput = ({ input, label, meta }) => {
	const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
	return (
		<div className={className}>
			<label htmlFor=''>{label}</label>
			<input type='text' {...input} autoComplete='off' />
			{renderError(meta)}
		</div>
	);
};

const renderError = ({ error, touched }) => {
	if (touched && error) {
		return (
			<div className='ui error message'>
				<div className='header'>{error}</div>
			</div>
		);
	}
};

const validateForm = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate: validateForm,
})(StreamForm);
