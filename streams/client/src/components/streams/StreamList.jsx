import React, { useEffect, Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../../actions';
// import history from '../../history';

const StreamList = () => {
	const dispatch = useDispatch();
	const currentUserId = useSelector(state => state.auth.userId);
	const isSignedIn = useSelector((state) => state.auth.isSignedIn);
	const streams = useSelector((state) => _.values(state.streams));
	const loading = useSelector(state => state.loading);

	useEffect(() => {
		dispatch(fetchStreams());
	}, [dispatch]);

	return (
		<Fragment>
			<h2>Streams</h2>
			{!loading.loading ? (
				<div className='ui celled list'>
					{streams.map((stream) => renderList({ ...stream, currentUserId }))}
				</div>
			) : (
				<div class='ui'>
					<div class='ui active inverted dimmer'>
						<div class='ui text loader'>Loading</div>
					</div>
					<p></p>
				</div>
			)}
			{renderCreate(isSignedIn)}
		</Fragment>
	);
};

const renderList = ({ id, title, description, userId, currentUserId }) => {
	return (
		<div className='item' key={id}>
			{renderAdminOptions(id, userId, currentUserId)}
			<i className='large middle aligned icon camera' />
			<div className='content'>
				{title}
				<div className='description'>{description}</div>
			</div>
		</div>
	);
};

const renderAdminOptions = (streamId, userId, currentUserId) => {
	return (
		<Fragment>
			{userId && userId === currentUserId && (
				<div className='right floated content'>
					<Link to={`/streams/edit/${streamId}`} className='ui button primary'>
						Edit
					</Link>
					<Link to={`/streams/delete/${streamId}`} className='ui button negative'>
						Delete
					</Link>
				</div>
			)}
		</Fragment>
	);
};

const renderCreate = (isSignedIn) => {
	return (
		<Fragment>
			{isSignedIn && (
				<div style={{ textAlign: 'right' }}>
					<Link to='/streams/new' className='ui button primary'>
						Create Stream
					</Link>
				</div>
			)}
		</Fragment>
	);
};

export default StreamList;
