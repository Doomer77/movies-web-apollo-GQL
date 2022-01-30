import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      rating
      language
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 25%;
  height: 60%;
  background-color: transparent;
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

const Suggestions = styled.ul`
  padding: 10px;
  height: 50px;
  display: flex;
`;

const Suggestion = styled.li`
  width: 20%;
  height: 40px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id,
    },
  });
  return (
    <>
      <Container>
        <Column>
          <Title>
            {loading
              ? "Загрузка..."
              : `${data?.movie?.title} 
          ${data?.movie?.isLiked ? "))" : "(("}`}
          </Title>
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Container>
      <Title>Рекомендуемое</Title>
      <Suggestions>
        {data?.suggestions?.map((s) => {
          return <Movie key={s.id} id={s.id} bg={s.medium_cover_image} />;
        })}
      </Suggestions>
    </>
  );
};
