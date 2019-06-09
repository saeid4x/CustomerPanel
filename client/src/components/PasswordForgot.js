import React,{Component} from 'react';
import MainLayout from './mainLayout';
import {Link} from 'react-router-dom';
import mainLayout from './mainLayout';


export default class extends Component{

    render() {
      return (
        <section className="passwordForgot">
            <mainLayout/>    
            <section className="passwordForgot-content">
                <h1>فراموشی کلمه عبور </h1>
                </section>   
        </section>
      )
    }
}