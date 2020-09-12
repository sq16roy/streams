import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions';

const StreamEdit = (props) => {
	const dispatch = useDispatch();
	const stream = useSelector((state) => state.streams[props.match.params.id]);

	useEffect(() => {
		dispatch(fetchStream(props.match.params.id));
	}, [dispatch, props.match.params.id]);
	
	const onEditSubmit = (values) => {
		dispatch(editStream(props.match.params.id, values));
	};

	return (
		<div>
			<h3>Edit Stream</h3>
			{stream && (
				<StreamForm
					initialValues={_.pick(stream, 'title', 'description')}
					onSubmit={onEditSubmit}
				/>
			)}
		</div>
	);
};

export default StreamEdit;