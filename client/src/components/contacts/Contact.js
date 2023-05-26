import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Spinner from './../layout/Spinner'
const Contact = () => {
    const contactContext = useContext(ContactContext)
    const {contacts, filtered, loading} = contactContext;

    if(contacts !== null && contacts.length <= 0 && !loading) return <h3>please add contact</h3>
    else if (contacts !== null && contacts.length <= 0 && loading) {
        return <Spinner/>
    }

    return (
        <Fragment>
            <TransitionGroup>   
                {filtered? filtered.map((contact)=>{
                    return <CSSTransition key={contact._id} timeout={500} classNames='item'>
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                }):contacts.map((contact)=>{
                    return  <CSSTransition key={contact._id} timeout={500} classNames='item'> 
                        <ContactItem key={contact.id} contact={contact}/>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </Fragment>
    )
}

// Contact.propTypes = {}

export default Contact