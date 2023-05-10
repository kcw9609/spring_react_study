import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { DeleteOutline, DeleteOutlined } from "@material-ui/icons";
class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
    this.delete = props.delete;
  }
  deleteEventHandler = () => {
    this.delete(this.state.item)
  }
  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <ListItemText>
          <InputBase
            inputProps={{"aria-label": "naked"}}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            
            multiline={true}
            fullWidth={true}
          />
          
        </ListItemText>  
        <ListItemSecondaryAction>
        <IconButton aria-label = "Delete Todo"
          onClick={this.deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
        </ListItemSecondaryAction>      
      </ListItem>
      
    );
  }
}
export default Book;
/* <InputBase inputProps={{ "arial-label": "naked"}} id ={item.id} name = {item.id} value = {item.id} />
          <InputBase inputProps={{ "arial-label": "naked"}} id ={item.id} name = {item.id} value = {item.title} />
          <InputBase inputProps={{ "arial-label": "naked"}} id ={item.id} name = {item.id} value = {item.author} />
          <InputBase inputProps={{ "arial-label": "naked"}} id ={item.id} name = {item.id} value = {item.publisher} />*/