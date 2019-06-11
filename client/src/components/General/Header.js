import React,{Component} from 'react';


export default class extends Component{
    constructor(props){
        super(props);

    }

    state={
        showLogout:'none',
        showLogin:'none'
    }
   
    componentDidMount(){
        let userID=localStorage.getItem('userID');
    console.log('650',userID)
        if(userID){
            this.setState({
                showLogout:'block',
            })
        }else{
            this.setState({
                showLogout:'none',
                showLogin:'block'
            })
        }
         
    
    }
    logout=(e)=>{
        localStorage.removeItem('mobile');
        localStorage.removeItem('userID');
        window.location.href = "http://127.0.0.1:3000/login";
    }
    render(){
        return(
            <section className="Header">
            <nav className="navbar navbar-dark bg-primary text-white">
            <span style={{display:`${this.state.showLogout}`}} >
                    <button onClick={this.logout} className="btn btn-outline-danger text-white" style={{display:`${this.state.showLogout}`}}>خروج</button>
                </span>
            <span  style={{display:`${this.state.showLogin}`}} >
                    <button onClick={this.logout} className="btn btn-outline-danger text-white" style={{display:`${this.state.showLogin}`}}>ورود</button>
                </span>
                <h4> پنل مشتریان</h4>
               
  
            </nav>


            </section>
        )
    }

}