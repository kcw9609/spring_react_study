import React from "react";
import { signin } from "./service/ApiService";
import {Grid, Link, TextField, Button, Typography }  from "@material-ui/core";
import  { Container } from "@material-ui/core";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); // 추가

  }
  // 추가
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    // ApiService signin메소드 사용
    signin({ email: email, password: password });
  }

  render(){ // 수정
    return (
      <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
        </Grid>
      <form noValidate onSubmit={this.handleSubmit}>
        {" "}
        {/* submit버튼을 클릭하면 handleSubmit이 실행됨 */}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="패스워드"
            type="password"
            id="password"
            autoComplete="current-password"
          />  
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            로그인
          </Button>
        </Grid>
        <Link href="/signup" variant="body2">
          <Grid item>계정이 없습니까? 여기서 가입 하세요.</Grid>
        </Link>
        
      </form>
      </Container>
    );
  }
}
export default Login;