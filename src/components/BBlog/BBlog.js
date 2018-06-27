import React from 'react';

const BBlog = (props) => {
    return(
        <div key ={props.id}>
        <h3> {props.username}</h3>
        <img src= {props.picture} className="photo" height="100px" width="100px"/>
    <div style={{ justifyContent: "center", background: "rgba(255, 255, 255, 0.493)" , width: "63.5%"}}>
        <h5>{props.post}</h5>
        <h6>{props.stamp}</h6>
    </div>
    {props.user.id === props.user_id ?
    <div>
        <textarea className ="inputChange" rows="9" cols="50" id={props.id} onChange = { event => props.handleChanges(event.target.value)}></textarea> 
            <br/>
        <div className = "movebutton1">
            <button className="button"onClick={() => props.deletePost(props.id)}>Delete</button>
        </div>
        <div className = "movebutton2">
            <button className="button"onClick={() => props.editBackpackerBlogPost(props.id)}> Edit Post </button>
        </div>
    </div> : ''}
</div>
    )
}

export default BBlog