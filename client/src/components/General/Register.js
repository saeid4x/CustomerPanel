import React,{Component } from 'react';

export default class extends Component{
    state={
        mobileNumber:120
    }

    handleSubmit=(e)=>{
        e.preventDefault();  
          let mobileNumber=this.mobile.value;
          this.setState({
              mobileNumber
          })
          
    }
     
    render(){
        return(
            <section className="RegisterCustomer">
                <section className="container">
            
                <form action="" onSubmit={this.handleSubmit}>
                       <h1>ثبت نام مشتری </h1>
                <input type="text" placeholder="شماره همراه" ref={(input)=>{this.mobile=input}}/>
                <br/>
                <button type="submit" className="btn btn-primary">submit</button>

                </form>
                </section>

            </section>
            
        )
    }
}