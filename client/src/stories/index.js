import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Breadcrumb from '../components/Breadcrumb';
import CollaboratorsList from '../components/CollaboratorsList';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Avatar from '../components/Ticket/components/Avatar';
import CommentForm from '../components/Ticket/components/CommentForm';
import Comment from '../components/Ticket/components/Comment';

import '../App.css';

const breadcrumbItems = [{link: '/', text:'Home'}, {link: 'http://google.com', text:'Google'}, {link: 'http://example.com', text:'Test'}];
storiesOf('Breadcrumb', module).add('default', () => <Breadcrumb items={breadcrumbItems} />);

const collaborators = [{name: 'Allice', email: 'allice@example.com'}, {name: 'Bob', email: 'bob@example.com'}];
storiesOf('CollaboratorsList', module)
  .add('default', () => <CollaboratorsList collaborators={collaborators} />);

storiesOf('Header', module)
	.add('default', () => <Header />);

storiesOf('Spinner', module)
	.add('default', () => <Spinner />);

const authorWithPhoto = {initials: 'D J', name: 'Damian Jóźwiak', photo: 'https://will-code-for-pizza.zendesk.com/system/photos/3600/1490/7171/profile_image_361671048472_2250442.jpg'};
storiesOf('Avatar', module)
	.add('default', () => <Avatar author={{initials: 'D J'}} />)
	.add('with photo', () => <Avatar author={authorWithPhoto} />);


function onSubmit() {
	action('form-submit');
	return Promise.resolve();
}
storiesOf('CommentForm', module)
	.add('default', () => <CommentForm onSubmit={onSubmit} />);

const comment = {
	author: authorWithPhoto,
	html_body: 'Lorem ipsum dolo...',
	created_at: '2018-03-10T21:56:35Z'
}
storiesOf('Comment', module)
	.add('default', () => <div><Comment comment={comment} primary={true}/><Comment comment={comment}/></div>);

