import React from 'react';
import { useDispatch } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = () => {
    const dispatch = useDispatch();
    const onCreateSubmit = (values) => {
        dispatch(createStream(values));
    };

    return(
        <div>
            <h3>Create Stream</h3>
            <StreamForm
                onSubmit={onCreateSubmit}
            />
        </div>
    );
};

export default StreamCreate;