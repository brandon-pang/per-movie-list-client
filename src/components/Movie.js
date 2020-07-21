import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE=gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!){
    toggleLikeMovie(id: $id, isLiked:$isLiked) @client
  }
`;

const Container = styled.div`
  height: 400px;
  width: 100%;
  border-radius:7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color:transparent;
`;
const StyledLink = styled(Link)`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`;
const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const LikeBtn=styled.button`
  margin-top:10px;
  margin-bottom:10px;
  width:120px;
  height:28px;
  font-size:20px;
`;

export default ({ id, bg, isLiked }) => {
  const [toggleMovie]= useMutation(LIKE_MOVIE,{
    variables: {id: parseInt(id), isLiked}
  });
  return (
    <Container>
      <StyledLink to={`/${id}`}>
        <Poster bg={bg} />        
      </StyledLink>
      <LikeBtn onClick={toggleMovie}>{isLiked ? 'Unlike' : 'Like'}</LikeBtn>
    </Container>
  );
};