import { Component } from 'react'
import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' + props.asin,
          {
            headers: {
              Authorization: 'Bearer inserisci-qui-il-tuo-token',
            },
          }
        );
        if (response.ok) {
          let commentsData = await response.json();
          setComments(commentsData);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (props.asin) {
      fetchComments();
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
