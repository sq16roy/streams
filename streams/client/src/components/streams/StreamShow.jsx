import React,{ useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
	const dispatch = useDispatch();
	const stream = useSelector(state => state.streams[props.match.params.id]);
	const videoRef = useRef(null);
	const [player, setPlayer] = useState('');

	useEffect(() => {
		dispatch(fetchStream(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	useEffect(() => {

		if (player || !stream) {
			return;
		}
		setPlayer(flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${props.match.params.id}.flv`
		}));
		
	}, [props.match.params.id, player, stream]);

	useEffect(() => {
		if (!player) {
			return;
		}
		player.attachMediaElement(videoRef.current);
		player.load();

		return () => {
			player.destroy();
		}

	}, [player]);

	if (!stream) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<video
				ref={videoRef}
				style={{width: '100%'}}
				controls
			/>
			<h1>{stream.title}</h1>
			<h5>{stream.description}</h5>
		</div>
	);
};

export default StreamShow;
