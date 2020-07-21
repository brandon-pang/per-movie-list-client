import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }    
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  padding-top:60px;
  padding-bottom:60px;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction:column;
  color: white;
`;
const DetailCont=styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;  
`;

const SugCont=styled.div`
  margin-top:40px;
  width:100%;  
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction:column; 
`;

const Column = styled.div`
  margin-left: 10px;
  width:50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 30%;
  height: 500px;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: top center;
`;

const SugUl=styled.ul`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const SugLi=styled.li`
  margin:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SugImg=styled.img`
  width: 100%;
  height: auto;
`;
const SugTitle=styled.p`
  font-size: 20px;
  margin-top: 15px;
`;

export default () => {  
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  
  return (
    <Container> 
      <DetailCont>  
        <Column>
            <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "💖" : "🙁"}`}</Title>
            <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </DetailCont>
      <SugCont>
        <Title>Suggestions</Title>
        <SugUl>          
          {data?.suggestions?.map(m => (
            <SugLi key={m.id}>
              <SugImg src={m.medium_cover_image} alt="" />
              <SugTitle>{m.title}</SugTitle>
            </SugLi>
          ))}
        </SugUl>        
      </SugCont>
    </Container>
  );
};