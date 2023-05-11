import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class BookAdd extends React.Component {
    constructor(props) {
     super(props);
     this.state = { item: { title: "", author: "", publisher: "", userId: "" }}; //사용자의 입력을 저장할 오브젝트
     this.add = props.add;
  }
  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "", author: "", publisher: "", userId: "" } }); // 추가 후 state객체 초기화
  }
  // 함수 작성
  onInputChange = (e) => {
    const thisItem = this.state.item;
    const changedTextFieldId = e.target.id; // 변한 텍스트 필드의 아이디
    // title, author, publisher, userId중 변한 부분이 어디인지 if문으로 작성
    if(changedTextFieldId === "title"){
      thisItem.title = e.target.value;
    }
    if(changedTextFieldId === "author"){
      thisItem.author = e.target.value;
    }
    if(changedTextFieldId === "publisher"){
      thisItem.publisher = e.target.value;
    }
    if(changedTextFieldId === "userId"){
      thisItem.userId = e.target.value;
    }
    // thisItem.title = e.target.value;
    this.setState({ item: thisItem }); // 사용자가 key입력할 때마다 state객체 설정
    console.log(thisItem);
  }

  render() {
    const addtable = 
    <Paper style={{ margin: 16, padding: 16 }}>
        <Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> <label>title: </label> </Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}>
             <TextField id="title" placeholder="add here" onChange={this.onInputChange} value={this.state.item.title} /> 
          </Grid>  
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> <label>author: </label> </Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> 
            <TextField id="author" placeholder="add here" onChange={this.onInputChange} value={this.state.item.author} /> 
          </Grid>  
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> <label>publisher: </label> </Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> 
            <TextField id="publisher" placeholder="add here" onChange={this.onInputChange} value={this.state.item.publisher} /> 
          </Grid>  
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> <label>userid: </label> </Grid>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}>
             <TextField id="userId" placeholder="add here" onChange={this.onInputChange} value={this.state.item.userId} /> 
          </Grid>  
          <Grid xs={4} md={4} item> 
            <Button fullWidth color ="secondary" variant="outlined" onClick={this.onButtonClick}>제품 추가</Button> 
          </Grid>
        </Grid>
      </Paper>
    return (
      addtable
      

    );
  }
}
export default BookAdd;