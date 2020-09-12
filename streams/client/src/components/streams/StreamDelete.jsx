import React, { Fragment, useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStream, fetchStream } from '../../actions';

const StreamDelete = (props) => {
	const dispatch = useDispatch();
	const stream = useSelector((state) => state.streams[props.match.params.id]);

	useEffect(() => {
		dispatch(fetchStream(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const actions = (
		<Fragment>
			<button
				className='ui button negative'
				onClick={() => dispatch(deleteStream(props.match.params.id))}
			>
				Delete
			</button>
			<button
				className='ui button'
				onClick={() => history.push('/')}
			>
				Cancel
			</button>
		</Fragment>
	);

	return (
		<div>
			{stream && (
				<Modal
					title={`Delete Stream`}
					content={`Are you sure to delete the stream: ${stream.title}?`}
					actions={actions}
					onDismiss={() => history.push('/')}
				/>
			)}
		</div>
	);
};

export default StreamDelete;
