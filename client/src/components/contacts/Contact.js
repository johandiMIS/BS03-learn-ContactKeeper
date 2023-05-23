import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const Contact = () => {
    const contactContext = useContext(ContactContext)
    const {contacts, filtered} = contactContext;
    return (
        <Fragment>
            <TransitionGroup>   
                {filtered? filtered.map((contact)=>{
                    return <CSSTransition key={contact.id} timeout={500} classNames='item'>
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                }):contacts.map((contact)=>{
                    return  <CSSTransition key={contact.id} timeout={500} classNames='item'> 
                        <ContactItem key={contact.id} contact={contact}/>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </Fragment>
    )
}

// Contact.propTypes = {}

export default Contact