import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class BookDelete extends React.Component { //1. title 입력받고 2. 검색요청 3. 삭제 요청
  constructor(props) {
    super(props)
     this.state = { item: { title: "" }}; //사용자의 입력을 저장할 오브젝트
  }
  onButtonClick = () => {
    // 검색
    // 삭제
    this.setState({ item: { title: "" } }); // 추가 후 state객체 초기화
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value
    this.setState({ item: thisItem }); // 사용자가 key입력할 때마다 state객체 설정
    console.log(thisItem);
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={4} md={4} item style={{paddingRight: 16}}> 
            <TextField placeholder="delete here" value={this.state.item.title} onChange={this.onInputChange} /> 
          </Grid>
          <Grid xs={4} md={4} item> 
            <Button fullWidth color ="secondary" variant="outlined" onClick={this.onInputChange}>제품 삭제</Button> 
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
export default BookDelete;