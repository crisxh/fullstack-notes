function Note(props){
    return(
        <div className='note'>
            <div className="noteTextArea">
                <h3>Author: {props.Author} </h3>
                <p>Note:{props.Note} </p>
            </div>
            <div className="noteButtons">
                <button className='btn deleteBtn' onClick={()=>{props.delete(props.ID)} }>Delete</button>
                <button className='btn editBtn' onClick={props.edit}>Edit</button>
            </div>
        </div>
    )
}

export default Note;