import React from "react";
import { withAsyncAction } from "../../redux/HOCs";
import "./Messages.css";




class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      Like:0,
      Unlike:0,
      count: 0,
      image: ''
    }
  }


    likeHandler=()=>{
      console.log('Like!')

        this.setState((state,props) => ({
            like:state.like +1,
        }))

    }


    unlikeHandler=()=>{
      console.log('Unlike!')

        this.setState((state,props) => ({
            Unlike:state.Unlike +1,
        }))

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


  handleChange = (event) => {
    let data = {...this.state}; 
    data[event.target.name] = event.target.value;   
    this.setState(data);
    

  }

  render() {
    let display = (<div>No Messages Found</div>)
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        return (
          <li key={value.id}>{value.text}</li>
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

        <div className="tab">    
        <button onClick ={this.likeHandler}>Like!</button>
        <button onClick ={this.unlikeHandler}>Unlike!</button>
        </div>

      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);
