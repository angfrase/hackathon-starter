import React from "react";
import { withAsyncAction } from "../../redux/HOCs";
import "./Messages.css";




class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      addLike:0,
      removeLike:0,
      count: 0,
      image: ''
      
    }
  }


    addLike = (messageId)=>{
       this.props.addLike(messageId).then(() => {
        this.fetchMessages(); 

    })
  }


    removeLike = (likeId)=>{
      
      this.props.removeLike(likeId).then(() => {
        this.fetchMessages(); 
        

    })
  }


  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload)
      this.setState({
        messages:res.payload.messages,
        count: res.payload.count
      })
    })
  }

  newMessageHandler = () => {
    let text = this.state.message;
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: ''
    
      })
    })
  }
  

  createNewMessage = () => {
    let text = this.state.message;
    this.props.createNewMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: 'Like!'
    
      })
    })
  }

  deleteMessage = (messageId) => {
    
    this.props.deleteMessage(messageId).then(() => {
      this.fetchMessages();
      
    })
  }

  handleChange = (event) => {
    let data = {...this.state}; 
    data[event.target.name] = event.target.value;   
    this.setState(data);
    

  }
  

  render() {
   
    let display = (<div>No Messages Found</div>)
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        console.log(value)
        return (
          <li key={value.id}><button onClick={()=> this.deleteMessage (value.id)}>delete</button>
          <button onClick ={()=> this.addLike(value.id)}>Like!</button>
          <button onClick ={()=> this.removeLike(value.likes[0].id)}>Unlike!</button>
          {value.text}
          </li>
        )
      })
    }
    
    return (
      <div className="Messages">
        <div className="ListMessage">
          {display}
        </div>
        <div className="NewMessage">
          <input name="message" onChange={this.handleChange} value={this.state.message}/>
          <button onClick={this.newMessageHandler}> Send Message </button>
        </div>

        

      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);
