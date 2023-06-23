import { Table } from "@material-ui/core";
import React from "react";
import { TextField, Paper, Button, Grid, Icon } from "@material-ui/core";
import LaunchIcon from '@mui/icons-material/Launch';



class BookRows extends React.Component {
  constructor(props) {
    super(props);
    this.state={item :props.item };
    this.delete=props.delete;

  }
  handleClick = () => {
    if(this.state.item.url){
      window.open(this.state.item.url, "_blank"); 
    }

  };

  render() {
    const item = this.state.item;

    return (
      <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{this.state.item.author}</td>
          <td>{item.publisher}</td>
          <td>{item.userId}</td>{/**userid?username? */}
          <td>
            <button onClick={this.handleClick}><Icon component={LaunchIcon} /></button>
          </td>   
      </tr>
      
    )


  }
}
  
  
export default BookRows;
/*
<table>
        <caption>테이블 제목</caption>
        <thead>
          <tr>
            <th>열 1</th>
            <th>열 2</th>
            <th>열 3</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>행 1, 열 1</td>
            <td>행 1, 열 2</td>
            <td>행 1, 열 3</td>
          </tr>
          <tr>
            <td>행 2, 열 1</td>
            <td>행 2, 열 2</td>
            <td>행 2, 열 3</td>
          </tr>
          <tr>
            <td>행 3, 열 1</td>
            <td>행 3, 열 2</td>
            <td>행 3, 열 3</td>
          </tr>
          <tr>
            <td>행 4, 열 1</td>
            <td>행 4, 열 2</td>
            <td>행 4, 열 3</td>
          </tr>
          <tr>
            <td>행 5, 열 1</td>
            <td>행 5, 열 2</td>
            <td>행 5, 열 3</td>
          </tr>
        </tbody>
      </table>
*/